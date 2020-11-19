<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/{reactRouting}", name="home", defaults={"reactRouting": null})
     */
    public function index(): Response
    {
        return $this->render('default/index.html.twig', [
            'controller_name' => 'DefaultController',
        ]);
    }

    /**
     * @Route("/api/test", name="test")
     */
    public function test(): Response
    {
        $test = [
            [
                "id" => 1,
                "nom" =>'Test 1'
            ],
            [
                "id" => 2,
                "nom" =>'Test 2'
            ],[
                "id" => 3,
                "nom" =>'Test 3'
            ],
        ];
        return $this->json($test);
    }

}
