<?php

namespace App\Services;

class GeoJson
{

    /**
     * Count the number of geojson files in the folder.
     * 
     * By providing the path to the name of the first file, the function count all the file with the same prefix name.
     *
     * @param string $path The path to the first file of the folder without all the suffix ("_1" and "xaaaa").
     *
     * @return int
     */
    public function countFile($path)
    {
        $incrementation = "xaaaa";
        $fincrementation = 1;
        $i = 0;
        while (file_exists($path . '_' . $fincrementation . '_' . $incrementation . '.geojson')) {
            $i++;
            $incrementation++;
        }
        $incrementation = "xaaaa";
        $fincrementation++;
        while (file_exists($path . '_' . $fincrementation . '_' . $incrementation . '.geojson')) {
            $i++;
            $incrementation++;
        }
        $incrementation = "xaaaa";
        $fincrementation++;
        while (file_exists($path . '_' . $fincrementation . '_' . $incrementation . '.geojson')) {
            $i++;
            $incrementation++;
        }
        $incrementation = "xaaaa";
        $fincrementation++;
        while (file_exists($path . '_' . $fincrementation . '_' . $incrementation . '.geojson')) {
            $i++;
            $incrementation++;
        }
        return $i;
    }

    /**
     * 
     * @param array $features Collection of features.
     * @param array $bound Array of the coordinate of the limit of area.
     * @param int $limit It's the limit of features that we allow for each call.
     * 
     * @return array
     */
    public function filterJson($features, $bound, $limit = 1000)
    {
        $checklimit = $limit * 10; //limite to check if there are too much features for the RAM in the file
        if ($checklimit < 10000) $checklimit = 10000;
        $newFeatures = [];
        $i = 0;
        $indexWrite = sizeof($features) / $limit;


        if (!$this->checkNbrFeatures($features, $bound, $checklimit)) { //features > $limit
            for ($i = 0; $i < sizeof($features); $i += $indexWrite) {
                if (!$this->checkInside($features[$i], $bound)) continue;
                $newFeatures[] = $features[$i];
                $i = 0;
            }
            // foreach ($features as $feature) {
            //     if ($i > $indexWrite) { // We take the value each
            //         if (!$this->checkInside($feature, $bound)) continue;
            //         $newFeatures[] = $feature;
            //         $i = 0;
            //     }
            //     $i++;
            // }
        } else {
            foreach ($features as $feature) {
                $coordinates = $feature->geometry->coordinates[0];
                if ($feature->geometry->type == "MultiPolygon") {
                    $coordinates = $feature->geometry->coordinates[0][0];
                }
                $continue = false;
                for ($i = 0; $i < sizeof($coordinates); $i++) {
                    if (
                        0 + $coordinates[$i][0] < $bound['xmin'] + 0 ||
                        0 + $coordinates[$i][0] > $bound['xmax'] + 0 ||
                        0 + $coordinates[$i][1] < $bound['ymin'] + 0 ||
                        0 + $coordinates[$i][1] > $bound['ymax'] + 0
                    ) {
                        $continue = true;
                        break;
                    }
                }
                if ($continue == true) continue;
                $newFeatures[] = $feature;
            }
            if (sizeof($newFeatures) > $limit) {
                $indexWrite = sizeof($newFeatures) / $limit;
                for ($j = 0; $j < sizeof($newFeatures); $j++) {
                    if ($i < $indexWrite) {
                        unset($newFeatures[$j]);
                    } else {
                        $i = 0;
                    }
                }
            }
            array_values($newFeatures);
        }
        return $newFeatures;
    }

    /**
     * Check if the number of features is less tant the limit.
     * 
     * Count all features that inside the bound, then compare it to the given limit.
     * 
     * @param array $featuresTotal Array of all the features.
     * @param array $bound Array of the coordinate of the limit of area.
     * @param int $limit Number max of features.
     * 
     * @return boolean
     */
    function checkNbrFeatures($featuresTotal, $bound, $limit)
    {
        $countFeatures = 0;
        $i = 0;
        foreach ($featuresTotal as $singleFeature) {
            if ($i == $limit) break;
            if (!$this->checkInside($singleFeature, $bound)) continue;
            $countFeatures++;
            $i++;
        }
        return $countFeatures < $limit;
    }

    /**
     * Check if features is inside the bound.
     * 
     * It return true if the feature is inside the bound and false otherwise.
     * 
     * @param object $feature The feature to test.
     * @param array $bound Array of the coordinate of the limit of area.
     * 
     * @return boolean 
     */
    private function checkInside($feature, $bound)
    {
        $coordinates = $feature->geometry->coordinates[0];
        if ($feature->geometry->type == "MultiPolygon") {
            $coordinates = $feature->geometry->coordinates[0][0];
        }
        for ($i = 0; $i < sizeof($coordinates); $i++) {
            if (
                0 + $coordinates[$i][0] < $bound['xmin'] + 0 ||
                0 + $coordinates[$i][0] > $bound['xmax'] + 0 ||
                0 + $coordinates[$i][1] < $bound['ymin'] + 0 ||
                0 + $coordinates[$i][1] > $bound['ymax'] + 0
            ) {
                return false;
            }
        }
        return true;
    }

    public function big($geojson, $bound = ["xmin" => 43.099, "xmax" => 51.437, "ymin" => -20.112, "ymax" => -17.146])
    {
        $valiny = null;
        $newFeatures = [];
        // to Object
        ini_set('memory_limit', '4627370496');
        // $brute = json_decode($geojson);
        $brute = $this->fit($geojson, $bound);
        // clone the structure for the final answer
        $valiny = $brute;
        // get features as object
        $features = $brute->features;
        $limit = 0;
        $max = sizeof($features) / ((sizeof($features) / 10) + 1);
        if (sizeof($features) < 250) $max = 1;
        if (sizeof($features) > 5000) $max = sizeof($features) / ((sizeof($features) / 5) + 1);
        foreach ($features as $feature) {
            if ($limit >= $max) {
                $newFeatures[] = $feature;
                $limit = 0;
            }
            $limit++;
        }
        $valiny->features = $newFeatures;
        return $valiny;
    }

    // return features that is inside the bounds
    public function fit($geojson, $bound = ["xmin" => 43.099, "xmax" => 51.437, "ymin" => -20.112, "ymax" => -17.146])
    {
        $valiny = null;
        $newFeatures = [];

        // ini_set('memory_limit', -1);
        ini_set('memory_limit', '4627370496');

        // to Object
        $brute = json_decode($geojson);

        // clone the structure for the final answer
        $valiny = $brute;

        // get features as object
        $features = $brute->features;

        $newFeatures = $this->filterJson($features, $bound);
        $valiny->features = $newFeatures;

        return $valiny;
    }

    public function findGeoJson($directoryPath, $debut = 0, $fin = 5, $bound = ["xmin" => 42.5, "xmax" => 51, "ymin" => -26, "ymax" => -11.3])
    {
        $valiny = (object)[
            "type" => "FeatureCollection",
            "name" => "out",
            "crs" => (object)[
                "type" => "name", "properties" => (object)["name" => "urn:ogc:def:crs:OGC:1.3:CRS84"]
            ],
            "features" => []
        ];

        $namePourReference = "";

        $features = [];
        $incrementation = "xaaaa";
        $fincrementation = 1;
        $i = 0;
        while (file_exists($directoryPath . '_' . $fincrementation . '_' . $incrementation . '.geojson') && $i < $fin) {
            // if(!$this->checkGeoJson($directoryPath.'_'.$incrementation.'.geojson', $bound)) continue;
            // $features .= $this->featuresToJsonString($this->setFeaturesGeoJson($directoryPath.'_'.$incrementation.'.geojson', $bound));
            if ($i >= $debut) {
                $namePourReference .= '_' . $fincrementation . '_' . $incrementation;
                $temp = $this->setFeaturesGeoJson($directoryPath . '_' . $fincrementation . '_' . $incrementation . '.geojson', $bound);
                if ($temp != false) {
                    $features = array_merge($features, $temp);
                };
            }
            $incrementation++;
            $i++;
        }
        $incrementation2 = "xaaaa";
        $fincrementation++;
        while (file_exists($directoryPath . '_' . $fincrementation . '_' . $incrementation2 . '.geojson') && $i < $fin) {
            // if(!$this->checkGeoJson($directoryPath.'_'.$incrementation2.'.geojson', $bound)) continue;
            // $features .= $this->featuresToJsonString($this->setFeaturesGeoJson($directoryPath.'_'.$incrementation2.'.geojson', $bound));
            if ($i >= $debut) {
                $namePourReference .= '_' . $fincrementation . '_' . $incrementation2;
                $temp = $this->setFeaturesGeoJson($directoryPath . '_' . $fincrementation . '_' . $incrementation2 . '.geojson', $bound);
                if ($temp != false) {
                    $features = array_merge($features, $temp);
                };
            }
            $incrementation2++;
            $i++;
        }

        $incrementation3 = "xaaaa";
        $fincrementation++;
        while (file_exists($directoryPath . '_' . $fincrementation . '_' . $incrementation3 . '.geojson') && $i < $fin) {
            // if(!$this->checkGeoJson($directoryPath.'_'.$incrementation3.'.geojson', $bound)) continue;
            // $features .= $this->featuresToJsonString($this->setFeaturesGeoJson($directoryPath.'_'.$incrementation3.'.geojson', $bound));
            if ($i >= $debut) {
                $namePourReference .= '_' . $fincrementation . '_' . $incrementation3;
                $temp = $this->setFeaturesGeoJson($directoryPath . '_' . $fincrementation . '_' . $incrementation3 . '.geojson', $bound);
                if ($temp != false) {
                    $features = array_merge($features, $temp);
                };
            }
            $incrementation3++;
            $i++;
        }

        $incrementation4 = "xaaaa";
        $fincrementation++;
        while (file_exists($directoryPath . '_' . $fincrementation . '_' . $incrementation4 . '.geojson') && $i < $fin) {
            // if(!$this->checkGeoJson($directoryPath.'_'.$incrementation4.'.geojson', $bound)) continue;
            // $features .= $this->featuresToJsonString($this->setFeaturesGeoJson($directoryPath.'_'.$incrementation4.'.geojson', $bound));
            if ($i >= $debut) {
                $namePourReference .= '_' . $fincrementation . '_' . $incrementation4;
                $temp = $this->setFeaturesGeoJson($directoryPath . '_' . $fincrementation . '_' . $incrementation4 . '.geojson', $bound);
                if ($temp != false) {
                    $features = array_merge($features, $temp);
                };
            }
            $incrementation4++;
            $i++;
        }

        $valiny->name = $namePourReference;

        // if($incrementation2!="xaaaa") {
        //     $incrementation2--;
        //     $valiny->name = $directoryPath.'_'.$fincrementation.'_'.$incrementation2.'.geojson';
        // } else {
        //     $incrementation--;
        //     $fincrementation--;
        //     $valiny->name = $directoryPath.'_'.$fincrementation.'_'.$incrementation.'.geojson';
        // }

        // $valiny->features = $this->filterJson($features, $bound, 1000);
        $valiny->features = $features;
        return $valiny;
    }




    private function checkGeoJson($features, $bound)
    {
        if (!$this->checkInside($features[0], $bound)) return false;
        if (!$this->checkInside($features[sizeof($features) - 1], $bound)) return false;
        return true;
    }

    private function setFeaturesGeoJson($file, $bound, $limit = 150)
    {
        $geojson = file_get_contents($file);
        $json = json_decode($geojson);
        $features = $json->features;
        // if(!$this->checkGeoJson($features, $bound)) return false;
        return $this->filterJson($features, $bound, $limit);
    }
}
