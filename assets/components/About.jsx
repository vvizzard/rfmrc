import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"
import History from './History'
import Partners from './Partners'
import Footer from './Footer'

export default function About(props) {

    const histories = [
        {
            classe:"",
            link:"/",
            name:"Accueil",
            hide:""
        },
        {
            classe:"active",
            link:"#",
            name:"A propos",
            hide:"hidden"
        }
    ];

    return (
        <div>
            <History link={histories} title="A propos" />
            <div className="content titled-content">
                <section className="about">
                    <div className="container white-bg disposition shadow">
                        <h1>Présentation</h1>
                        <div className="sujets-description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, hic nostrum ipsam esse adipisci iure. Fuga, maiores. Saepe earum recusandae commodi accusantium, quae ipsa ab odio beatae neque veritatis excepturi repellat ut illum! Dolores modi suscipit debitis! Hic amet, omnis eos sed reprehenderit, dolor ea voluptatibus quis totam nisi repudiandae deleniti? Adipisci sed asperiores nobis quos voluptatum cumque accusamus? Magni, repellendus libero! Ad illo voluptates voluptas tempora reiciendis ipsum, labore quisquam quasi tenetur nam rerum nesciunt quae ex aut mollitia pariatur, ea optio deleniti itaque. Veniam aliquam ea ad officia dolorum sapiente officiis, sit veritatis exercitationem, vero tempora iure, praesentium mollitia iste eos. Error cum commodi dicta ut eum deleniti sequi cupiditate explicabo sed unde nobis, molestiae sunt beatae corporis quam possimus, ipsa tenetur amet. Et consequatur officia nam accusantium iusto enim, voluptas laborum cumque? Animi, vel! Hic vel, quos totam soluta in quae sed voluptates veniam accusantium. Magni, officia! Ab aliquid soluta fuga voluptatum dolor perferendis eius id unde nam. Odit libero consequuntur optio deleniti esse minus, cupiditate ipsam neque error eum aliquid laudantium quod. Dicta, dolorum quaerat voluptates, similique neque explicabo quidem corporis commodi ab repellat aliquid placeat ipsum assumenda eaque praesentium veritatis optio eius nesciunt quia! Amet quae voluptates distinctio non. Repellat consequuntur, provident asperiores reprehenderit officiis eum laudantium aperiam quaerat cupiditate quos reiciendis assumenda dicta nesciunt quia atque doloribus tempore deserunt fugit harum temporibus dolore dolorem at illum natus. Nostrum ab similique dolorum quo, incidunt quis doloribus, quidem ea dicta nemo veniam officiis quisquam, voluptatibus magni facere? Quod dolores esse aliquam molestias impedit debitis iusto expedita at, nam velit quasi earum saepe nesciunt soluta voluptatum recusandae aspernatur corrupti perferendis ex excepturi nostrum hic? Suscipit assumenda quod sit, provident atque quasi voluptas rerum tempore hic itaque dolore voluptatum esse molestias soluta minima et, amet laborum totam repellat possimus id. Hic velit nemo eius. Blanditiis deleniti, nisi placeat consequuntur repellendus rem reiciendis fuga ipsum, aliquid eos similique nobis culpa, amet saepe illo aperiam accusamus natus neque consequatur dolores. Est accusamus, ab deserunt aut delectus suscipit eaque dolor minima libero quis, necessitatibus esse soluta! Molestias ex eum ab nam iure, ducimus animi cupiditate, qui repudiandae et, fuga facere quos inventore quod dolor rerum itaque iusto maxime magni! Neque libero ut beatae, ipsum accusantium recusandae voluptatum, totam fuga, eligendi nulla quam? Dolorem, fugiat sed magnam distinctio nihil necessitatibus dolores fuga incidunt doloremque veritatis cum provident amet aspernatur pariatur libero reprehenderit animi laudantium voluptate impedit. Quod deserunt corrupti, non accusamus officia recusandae? Commodi nobis asperiores animi at minima ut veritatis neque beatae. Inventore itaque quibusdam ab fugiat nemo necessitatibus sit doloremque molestiae assumenda veniam quasi aperiam maiores quidem id dicta, obcaecati quisquam qui sed rem natus at totam quas repellat ullam? Nam atque placeat enim totam perspiciatis exercitationem minus, accusamus saepe odio vero ab quod veniam, repudiandae impedit ex obcaecati cupiditate vel ipsam. Non quidem laboriosam unde alias! Odit, sed molestias voluptate quasi quidem doloribus, consequatur, officia est sequi at quod. Harum itaque deserunt nam dignissimos facere! Omnis quisquam recusandae perspiciatis!
                        </div>
                        <h1>Historique</h1>
                        <div className="sujets-description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error alias sapiente non dolore autem repellendus aliquam vitae eligendi, eveniet, minima harum ratione deserunt molestiae? Eum quae ipsam dolores minus numquam aliquam, praesentium quaerat sit placeat laudantium impedit dicta non hic natus ex enim obcaecati quas ut dolorum nulla molestiae corrupti dignissimos. Dolores maxime dolorem vero saepe a inventore dignissimos ab facere molestias harum, sit esse neque eveniet nemo qui excepturi placeat blanditiis numquam corporis nam quibusdam quos! Quia dignissimos, hic officia in, reiciendis nulla qui, excepturi sapiente rerum distinctio voluptate eius! Pariatur, fuga. Ipsam ipsum quasi, nulla necessitatibus, sit nobis vitae voluptatem similique quod, aut officia excepturi maxime et suscipit deleniti optio consequatur atque ullam adipisci. Soluta optio sapiente tenetur laudantium eaque magnam cum, rerum atque totam numquam voluptatem excepturi deserunt inventore pariatur laboriosam. Doloremque quisquam, ratione inventore rerum nesciunt necessitatibus. Dignissimos facilis consequuntur voluptates. Incidunt, aperiam fugiat alias corporis quidem hic porro molestiae odio animi beatae id! Iure beatae voluptate repudiandae tempore quibusdam voluptatem ad, rerum quae nulla? Assumenda, nemo. Iste voluptate eligendi esse quis tempore explicabo quas? Laboriosam exercitationem repellendus aspernatur, animi laudantium repellat doloremque, voluptatibus quo distinctio, ut veniam corporis reiciendis hic! Eum quia earum aut? Dolor atque ducimus, sint ut quibusdam vero tenetur sunt ipsum quasi laborum aperiam obcaecati cumque qui fuga dignissimos excepturi magni reiciendis fugit veritatis ex veniam aliquid. Officia consequatur, voluptate, excepturi nisi pariatur accusantium hic mollitia corrupti, iusto consequuntur provident? Non ipsa praesentium veritatis hic, sapiente quibusdam odio porro nesciunt expedita quo temporibus accusamus quod aspernatur provident ab obcaecati nemo voluptates placeat, vel minima reiciendis vero eligendi nihil. Dignissimos est voluptatum nisi facilis optio? Autem, suscipit blanditiis voluptas tenetur, beatae sit perspiciatis labore ipsam qui reiciendis cumque provident, laudantium nostrum ex! Earum iste odit expedita dolores autem necessitatibus possimus sunt excepturi ullam accusamus eius, veniam exercitationem sequi modi nobis quas sint magni commodi architecto consequatur repudiandae pariatur? Culpa aliquam error quis sint maxime voluptates dicta ut, iusto amet ratione aut, ipsa laudantium dolores cumque eligendi non officia. Assumenda ipsum tempora rem, corrupti corporis dicta possimus expedita voluptas mollitia explicabo magni necessitatibus error eaque fuga ducimus tenetur architecto? Tempora perferendis adipisci dicta cum odit, vitae accusantium, ut fugit accusamus amet eos? Corrupti eveniet officiis animi fuga, blanditiis temporibus quas. Assumenda exercitationem nihil maxime minima aliquid consectetur voluptatibus, qui pariatur optio natus eveniet atque nemo corporis. Voluptate fugiat temporibus consequuntur adipisci deleniti iste explicabo sequi quas veniam, obcaecati eum possimus dolores? Adipisci neque libero facere. Aspernatur reprehenderit unde perferendis, maiores assumenda quas accusamus consequatur quisquam mollitia non harum odio optio placeat sed repudiandae culpa ipsam obcaecati? Similique quia quidem perferendis, autem ullam molestiae numquam. Dolor culpa a officia tenetur. Laudantium libero ad reprehenderit distinctio?
                        </div>
                        <h1>Défis</h1>
                        <div className="sujets-description">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis distinctio atque perferendis unde maxime ipsam minus magni expedita minima. Perspiciatis culpa saepe aut iste praesentium ea non molestiae pariatur molestias?
                        </div>
                    </div>
                </section>
                <section className="section-bg">
                    <div className="section-bg-opacity">
                        <div className="container white-bg disposition shadow">
                            <Partners />
                        </div>
                    </div>
                </section>
                <Footer onClick={props.onClick} />
            </div>
        </div>
    )
}
