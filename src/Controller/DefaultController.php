<?php

namespace App\Controller;

use App\Services\GeoJson;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
// use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/api/geojson/{region}/{name}/{xmin}/{xmax}/{ymin}/{ymax}/{debut}/{fin}", name="geojson")
     */
    public function geosjon($region, $name, $xmin, $xmax, $ymin, $ymax, $debut, $fin): Response
    {
        $geoJson = new GeoJson();
        if ($region == "east-africa") {
            $region = "east-africa/Ethiopie_";
        } else if ($region == "kenya") {
            $region = "east-africa/Kenya_";
        } else {
            $region = "";
        }
        ini_set('memory_limit', '4627370496');
        $path = $this->getParameter('kernel.project_dir') . '/assets/layers/geojson/burnedarea/' . $region . $name . '/' . $name;
        $file = $geoJson->findGeoJson($path, $debut, $fin, ["xmin" => $xmin, "xmax" => $xmax, "ymin" => $ymin, "ymax" => $ymax]);
        return $this->json($file);
    }

    /**
     * @Route("/api/forecast_geojson/{name}/{number}/{region}", name="forecastGeojson")
     */
    public function forecastGeosjon($name, $number, $region = ""): Response
    {
        if ($region != "" && $region != "Madagascar") {
            $region = "Afrique/".$region."/";
        } else {
            $region = "";
        }
        ini_set('memory_limit', '4627370496');
        $path = $this->getParameter('kernel.project_dir') . '/assets/layers/geojson/forecast/' . $region . $name . '/' . $number;
        return $this->json(json_decode(file_get_contents($path))); //Forecast, the file is lightweight so we just send it without treatment
    }

    /**
     * @Route("/api/check_geojson/{region}/{name}", name="nbr_file_geojson")
     */
    public function nbrFile($region, $name): Response
    {
        $geoJson = new GeoJson();
        if ($region == "east-africa") {
            $region = "east-africa/Ethiopie_";
        } else if ($region == "kenya") {
            $region = "east-africa/Kenya_";
        } else {
            $region = "";
        }
        ini_set('memory_limit', '4627370496');
        $path = $this->getParameter('kernel.project_dir') . '/assets/layers/geojson/burnedarea/' . $region . $name . '/' . $name;
        $nbrFile = $geoJson->countFile($path);
        return $this->json($nbrFile);
    }

    /**
     * @Route("/api/mbtiles/{pays}/{file}", name="mbtiles")
     */
    public function mbtiles($pays, $file): StreamedResponse
    {
        ini_set('memory_limit', '4627370496');
        $path = $this->getParameter('kernel.project_dir') . '/assets/layers/geojson/burnedarea/Afrique/' . $pays . '/' . $file . '.mbtiles';

        if (file_exists($path)) {
            $response = new StreamedResponse();
            $response->headers->set('Content-Type', 'application/octet-stream');
            $response->headers->set('Content-Disposition', 'attachment; filename="' . $file . '.mbtiles"');
            $response->setCallback(function () use ($path) {
                $handle = fopen($path, 'rb');
                while (!feof($handle)) {
                    $chunk = fread($handle, 1024);
                    echo $chunk;
                    flush();
                }
                fclose($handle);
            });
            return $response;
        } else {
            return $this->json("Fichier introuvable");
        }
    }

    /**
     * @Route("/{reactRouting}", name="home", defaults={"reactRouting": null})
     */
    public function index(): Response
    {
        return $this->render('default/index.html.twig', [
            'controller_name' => 'DefaultController',
        ]);
    }
}
