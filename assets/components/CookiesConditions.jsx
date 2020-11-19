import React, { Component } from 'react'
import Popup from 'reactjs-popup';

export default function CookiesConditions(props) {

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <Popup closeOnDocumentClick={false} closeOnEscape={false} lockScroll open={props.open} modal>
            {() => ( 
                <div className="modal">
                    <div className="header"> Condition d'utilisation </div>
                    <div className="content">
                        <p>
                            Llanddev est un site web de cartographie focalisé sur l'Afrique de l'Est.<br></br>
                            Il fournit une carte avec dessus differents représentation tels que les points de feu, ... .<br></br>
                            L’accès y est actuellement libre, néanmoins, Llanddev se réserve le droit de changer ultérieurement l'accès au site et aux services offerts.<br></br>
                            En l'occurrence, Llanddev informera au préalable des changements et donnera l'occasion de s'abonner.<br></br>
                            Par la présente, Llanddev se réserve expressément le droit de changement, correction ou interruption à tout moment, de tout élément ou partie du site.<br></br>
                            <br></br>
                            Droit d'auteur: Le site contient du matériel et d’autres informations soumis à des droits d’auteurs incluant notamment, <br></br>
                                mais de façon non exhaustive, le texte, le logiciel, les photos et les graphiques. <br></br>
                            Par conséquent, l'utilisation de tout ou une partie de Llanddev à des fins commercials est strictement interdit sans en avoir préalablement obtenu l’autorisation écrite.<br></br>
                            <br></br>
                            Exclusion de Responsabilité : <br></br>
                            A. Les usagers conviennent expressément qu’ils utilisent Llanddev de leur propre initiative et assument par conséquent la responsabilité de l’usage du site. <br></br>
                            Ni Llanddev, ni ses filiales et ni ses fournisseurs de service ne garantissent l'ininterrutpion, l'infaillibilité, la correction des éventuelles erreurs ainsi que <br></br>
                            les résultats issues de l'utilisation de leurs services notamment en ce qui concerne l' exactitude et la fiabilité des informations fournies.<br></br>
                            <br></br>
                            B. Tout information et services de Llanddev sont fournis « en l’état », sans garanties d'aucune sorte, expresses ou implicites, notamment, entre autres,<br></br>
                                toute garantie de titre, information, services ou produits fournis via Llanddev, et toute garantie implicite de commerciabilité, <br></br>
                                d’adéquation à un but particulier ou de non transgression de la loi. <br></br>
                            <br></br>
                            C. Les informations contenues sur le site ne seront pas interprétées en tant que conseil, ni incitation à effectuer ou non un acte particulier. <br></br>
                            Llanddev n’est aucunement responsable de l’interprétation donnée par les usagers aux informations contenues sur le site, <br></br>
                                ni des actions qu’ils décideraient d’effectuer, suite aux informations obtenues par ce site. <br></br>
                            <br></br>
                            D. Llanddev ne sera tenu responsable d’aucun dommage ni d’aucune blessure dus à une quelconque interruption, erreur, inexactitude, correction, suppression du service. <br></br>
                            En outre, la responsabilité de Llanddev ne saurait être engagée en cas d’échec d’exploitation ou de non-exécution, de retard dans le fonctionnement ou la transmission,<br></br>
                                d’échec de la ligne de communication, ni pour les virus informatiques transmis au service après accès de l’usager à Llanddev ou à un autre site disposant <br></br>
                                d’un lien sur ses pages, non plus que du vol ou de la destruction, ni de l’accès frauduleux à son fichier, de son altération ou de son usage, <br></br>
                                qu’ils soient dus à une violation du contrat, au tort, à la négligence ou à toute autre cause. <br></br>
                            Cette limitation de la responsabilité s’étend et inclut tout dommage dû au téléchargement de matériel contenu sur Llanddev ou tout autre site lié à ses pages. <br></br>
                            <br></br>
                            E. La présente exclusion de responsabilité est applicable à toute information ou service fournis à l’usager de ce site sur simple accès à n’importe quelle page <br></br>
                                de Llanddev.<br></br>
                            <br></br>
                            Equipement : <br></br>
                            Il est de la seule responsabilité de l’usager d’acquérir et d’entretenir l’équipement requis pour l’accès <br></br>
                                et l’utilisation de ce site (par ex., matériel d'accès à internet, matériel informatique, etc.). <br></br>
                            Toutefois, Llanddev se réserve le droit de changer l’équipement nécessaire à l’accès et l’utilisation de ce site, <br></br>
                            à tout moment et sans autre préavis. Toutes les frais pour l’accès et l’utilisation de ce site (par ex., paiement des Fournisseurs de Service Internet, etc.) sont à la charge des usagers.<br></br>
                            <br></br>
                            Liens avec d’autres sites : <br></br>
                            Llanddev utilise des servcies d’autres sites, et propose des liens avec certains. <br></br>
                            Llanddev ne peut et n'exerce aucune forme de contrôle sur la qualité, la quantité, la disponibilité, le contenu ainsi que les possibles violations de la loi sur les droits intellectuels des informations et services fournies par les autres sites.<br></br>
                            Les usagers doivent s’adresser aux autres sites pour tout éventuel problème pouvant être renconté lors de la visite ou de l’utilisation de ces sites. <br></br>
                            En aucun cas Llanddev n’assume ni ne porte la responsabilité quant au contenu de ces sites.<br></br>
                            <br></br>
                            Indemnités : <br></br>
                            Les usagers acceptent d'indemniser, de défendre et de prémunir Llanddev, ses affiliés et ses personnels quant aux responsabilités, dommages, plaintes, exigences, pertes, profits et coûts, y compris les honoraires d'avocat, résultant de l’utilisation de ce site.<br></br>
                            <br></br>
                            Modification des conditions : <br></br>
                            Llanddev se réserve le droit de changer ou de modifier, à tout moment, tout ou certaines parties des termes et des dispositions sur l'utilisation du site, avec ou sans préavis. <br></br>
                            L'utilisation du site Web après la publication de tout changement constitue l'acceptation de ces changements.<br></br>
                            <br></br>
                            Divers : <br></br>
                            Ces conditions d’utilisation constituent le plein accord entre les parties contractantes en ce qui concerne l’utilisation de Llanddev <br></br>
                                et prévalent sur tout accord précédent écrit ou verbal afférent au même contenu. <br></br>
                            Aucune renonciation de l’une des parties contractantes concernant un manquement ou une violation découlant de la présente <br></br>
                                ne vaudra renonciation concernant un manquement ou une violation antérieurs ou ultérieurs. <br></br>
                            Les titres de rubriques sont insérés dans le but de faciliter la lecture et n’affectent en aucun cas l’interprétation des conditions d’utilisation.<br></br>
                            <br></br>
                            Dissociabilité : <br></br>
                            Si l'une quelconque des clauses du présent Accord s'avère être illégale, invalide ou inopposable, pour quelque raison que ce soit, les autres clauses ne seront pas affectées et demeureront entièrement en vigueur. <br></br>
                            <br></br>
                            Langue : <br></br>
                            Le présent accord a été rédigé en français. Dans le cas où un litige apparaîtrait suite à la traduction du texte, la version française prévaut.<br></br>
                            <br></br>
                            Législation applicable : <br></br>
                            Compétence : Le présent Accord est régi et interprété par la législation hellénique et européenne et relève de la compétence exclusive des tribunaux d’Athènes en Grèce.<br></br>
                        </p>
                    </div>
                    <div className="footer">
                        <button className="btn btn-success" onClick={() => props.closePopup()}>
                            J'accepte
                        </button>
                        <button className="btn btn-danger" onClick={refreshPage}>
                            Je refuse
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    )
}
