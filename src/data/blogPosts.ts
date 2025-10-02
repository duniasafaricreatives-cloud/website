export interface BlogPost {
  id: number;
  title: string;
  title_fr?: string;
  slug: string;
  slug_fr?: string;
  excerpt: string;
  excerpt_fr?: string;
  content: string;
  content_fr?: string;
  image: string;
  author: string;
  publishDate: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Top 5 Things to Do in Marrakech During AFCON 2025",
    title_fr: "Top 5 des choses à faire à Marrakech pendant la CAN 2025",
    slug: "top-5-things-marrakech-afcon-2025",
    slug_fr: "top-5-choses-marrakech-can-2025",
    excerpt: "From stadium roars to desert nights, here's your guide to the best experiences in Morocco's red city during the tournament.",
    excerpt_fr: "Des rugissements du stade aux nuits du désert, voici votre guide des meilleures expériences dans la ville rouge du Maroc pendant le tournoi.",
    image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    author: "Mimi Babs",
    publishDate: "2025-01-15",
    readTime: "5 min read",
    content: `
      <div class="prose prose-lg max-w-none">
        <p>Marrakech, the vibrant red city of Morocco, transforms into an even more electrifying destination during AFCON 2025. Whether you're here to cheer for your favorite team or explore this magical city, here are the top 5 experiences you absolutely cannot miss.</p>
        
        <h2>1. Experience the Electric Atmosphere at Stadium Matches</h2>
        <p>Nothing compares to the energy of an AFCON match in Marrakech. The roar of the crowd, the colorful displays of support, and the passion of African football create an unforgettable atmosphere. Make sure to arrive early to soak in the pre-match festivities and connect with fans from across the continent.</p>
        
        <h2>2. Lose Yourself in the Medina's Souks</h2>
        <p>The ancient medina of Marrakech is a UNESCO World Heritage site that offers a sensory overload like no other. Navigate through narrow alleyways filled with spice vendors, textile merchants, and artisan workshops. Don't forget to haggle – it's part of the experience! The souks are particularly magical in the evening when lanterns illuminate the pathways.</p>
        
        <h2>3. Witness Sunset at Jemaa el-Fnaa Square</h2>
        <p>As the sun sets over Marrakech, Jemaa el-Fnaa square comes alive with storytellers, musicians, snake charmers, and food vendors. Grab a fresh orange juice from one of the many stalls and watch the square transform from a daytime marketplace to an evening entertainment hub. The energy here is infectious and truly captures the spirit of Morocco.</p>
        
        <h2>4. Escape to the Atlas Mountains</h2>
        <p>Just a short drive from Marrakech, the Atlas Mountains offer a refreshing escape from the city's hustle and bustle. Take a day trip to explore Berber villages, hike scenic trails, or simply enjoy the cooler mountain air. The contrast between the desert city and the green valleys is breathtaking.</p>
        
        <h2>5. Indulge in Authentic Moroccan Cuisine</h2>
        <p>No visit to Marrakech is complete without experiencing its incredible food scene. From street food in the medina to upscale restaurants serving traditional tagines, couscous, and pastilla, your taste buds are in for a treat. Don't miss trying mint tea – it's not just a drink, it's a cultural experience.</p>
        
        <p><strong>Pro Tip:</strong> Book your accommodations early during AFCON 2025, as the city will be bustling with football fans from across Africa and beyond. Consider staying in a traditional riad for an authentic Moroccan experience.</p>
      </div>
    `,
    content_fr: `
      <div class="prose prose-lg max-w-none">
        <p>Marrakech, la ville rouge vibrante du Maroc, se transforme en une destination encore plus électrisante pendant la CAN 2025. Que vous soyez là pour encourager votre équipe favorite ou explorer cette ville magique, voici les 5 expériences que vous ne pouvez absolument pas manquer.</p>
        
        <h2>1. Vivez l'atmosphère électrique des matchs au stade</h2>
        <p>Rien ne se compare à l'énergie d'un match de la CAN à Marrakech. Le rugissement de la foule, les démonstrations colorées de soutien et la passion du football africain créent une atmosphère inoubliable. Assurez-vous d'arriver tôt pour vous imprégner des festivités d'avant-match et vous connecter avec les fans de tout le continent.</p>
        
        <h2>2. Perdez-vous dans les souks de la médina</h2>
        <p>L'ancienne médina de Marrakech est un site du patrimoine mondial de l'UNESCO qui offre une surcharge sensorielle comme nulle part ailleurs. Naviguez dans les ruelles étroites remplies de marchands d'épices, de textiles et d'ateliers d'artisans. N'oubliez pas de marchander – cela fait partie de l'expérience ! Les souks sont particulièrement magiques le soir quand les lanternes illuminent les allées.</p>
        
        <h2>3. Assistez au coucher de soleil sur la place Jemaa el-Fnaa</h2>
        <p>Quand le soleil se couche sur Marrakech, la place Jemaa el-Fnaa s'anime avec des conteurs, des musiciens, des charmeurs de serpents et des vendeurs de nourriture. Prenez un jus d'orange frais dans l'un des nombreux stands et regardez la place se transformer d'un marché de jour en un centre de divertissement du soir. L'énergie ici est contagieuse et capture vraiment l'esprit du Maroc.</p>
        
        <h2>4. Échappez-vous vers les montagnes de l'Atlas</h2>
        <p>À seulement un court trajet en voiture de Marrakech, les montagnes de l'Atlas offrent une évasion rafraîchissante de l'agitation de la ville. Faites une excursion d'une journée pour explorer les villages berbères, faire de la randonnée sur des sentiers pittoresques, ou simplement profiter de l'air plus frais de la montagne. Le contraste entre la ville du désert et les vallées vertes est à couper le souffle.</p>
        
        <h2>5. Régalez-vous de la cuisine marocaine authentique</h2>
        <p>Aucune visite à Marrakech n'est complète sans découvrir sa scène culinaire incroyable. De la street food dans la médina aux restaurants haut de gamme servant des tagines traditionnels, du couscous et de la pastilla, vos papilles gustatives vont être gâtées. Ne manquez pas d'essayer le thé à la menthe – ce n'est pas seulement une boisson, c'est une expérience culturelle.</p>
        
        <p><strong>Conseil de pro :</strong> Réservez vos hébergements tôt pendant la CAN 2025, car la ville sera animée par les fans de football de toute l'Afrique et au-delà. Considérez séjourner dans un riad traditionnel pour une expérience marocaine authentique.</p>
      </div>
    `
  },
  {
    id: 2,
    title: "Why Morocco is Africa's Ultimate Holiday Destination",
    title_fr: "Pourquoi le Maroc est la destination de vacances ultime de l'Afrique",
    slug: "morocco-africa-ultimate-holiday-destination",
    slug_fr: "maroc-destination-vacances-ultime-afrique",
    excerpt: "Culture, cuisine, and coastlines — discover why Morocco should be on your bucket list and why it's the perfect gateway to African travel.",
    excerpt_fr: "Culture, cuisine et côtes — découvrez pourquoi le Maroc devrait être sur votre liste de souhaits et pourquoi c'est la porte d'entrée parfaite vers les voyages africains.",
    image: "https://images.pexels.com/photos/1309596/pexels-photo-1309596.jpeg",
    author: "Mimi Babs",
    publishDate: "2025-01-10",
    readTime: "7 min read",
    content: `
      <div class="prose prose-lg max-w-none">
        <p>Morocco stands as a jewel in Africa's crown, offering travelers an intoxicating blend of ancient traditions and modern sophistication. From the snow-capped Atlas Mountains to the golden Sahara dunes, from bustling imperial cities to tranquil coastal towns, Morocco delivers experiences that will leave you forever changed.</p>
        
        <h2>A Tapestry of Cultures</h2>
        <p>Morocco's unique position at the crossroads of Africa, Europe, and the Middle East has created a rich cultural tapestry unlike anywhere else on the continent. Arab, Berber, and French influences blend seamlessly, creating a society that's both deeply traditional and refreshingly cosmopolitan.</p>
        
        <p>Walk through any Moroccan city and you'll hear Arabic, Berber languages, French, and increasingly English spoken side by side. This linguistic diversity reflects the country's openness to the world while maintaining its authentic African identity.</p>
        
        <h2>Culinary Paradise</h2>
        <p>Moroccan cuisine is a celebration of flavors that reflects the country's diverse cultural influences. The famous tagine – both the dish and the conical clay pot it's cooked in – represents the perfect marriage of ingredients and technique that defines Moroccan cooking.</p>
        
        <p>From the aromatic spice markets of Fez to the seafood restaurants of Essaouira, every meal in Morocco is an adventure. The use of preserved lemons, olives, argan oil, and a complex blend of spices creates flavors that are both exotic and comforting.</p>
        
        <h2>Diverse Landscapes in One Country</h2>
        <p>Few countries offer such geographical diversity within their borders. In Morocco, you can:</p>
        <ul>
          <li>Surf Atlantic waves in Taghazout</li>
          <li>Trek through the High Atlas Mountains</li>
          <li>Camp under stars in the Sahara Desert</li>
          <li>Explore cedar forests in the Middle Atlas</li>
          <li>Relax on Mediterranean beaches in the north</li>
        </ul>
        
        <h2>Imperial Cities Rich in History</h2>
        <p>Morocco's four imperial cities – Marrakech, Fez, Meknes, and Rabat – each tell a different chapter of the country's fascinating history. These cities house some of the world's most beautiful Islamic architecture, from the intricate mosaics of the Bahia Palace to the towering minaret of the Koutoubia Mosque.</p>
        
        <h2>Gateway to African Adventure</h2>
        <p>For many travelers, Morocco serves as the perfect introduction to African travel. The country's well-developed tourism infrastructure, combined with its exotic appeal, makes it accessible to first-time visitors to the continent while still offering authentic African experiences.</p>
        
        <p>Morocco proves that Africa is not a single story but a continent of incredible diversity, and it invites you to explore further south and discover the rest of this magnificent continent.</p>
        
        <p><strong>Ready to explore Morocco?</strong> Join us at Dunia Safari for an unforgettable journey through this incredible country, especially during the excitement of AFCON 2025.</p>
      </div>
    `,
    content_fr: `
      <div class="prose prose-lg max-w-none">
        <p>Le Maroc se dresse comme un joyau dans la couronne de l'Afrique, offrant aux voyageurs un mélange enivrant de traditions anciennes et de sophistication moderne. Des montagnes enneigées de l'Atlas aux dunes dorées du Sahara, des villes impériales animées aux villes côtières tranquilles, le Maroc offre des expériences qui vous changeront à jamais.</p>
        
        <h2>Une tapisserie de cultures</h2>
        <p>La position unique du Maroc au carrefour de l'Afrique, de l'Europe et du Moyen-Orient a créé une riche tapisserie culturelle unique sur le continent. Les influences arabes, berbères et françaises se mélangent harmonieusement, créant une société à la fois profondément traditionnelle et rafraîchissante cosmopolite.</p>
        
        <p>Promenez-vous dans n'importe quelle ville marocaine et vous entendrez l'arabe, les langues berbères, le français et de plus en plus l'anglais parlés côte à côte. Cette diversité linguistique reflète l'ouverture du pays au monde tout en maintenant son identité africaine authentique.</p>
        
        <h2>Paradis culinaire</h2>
        <p>La cuisine marocaine est une célébration de saveurs qui reflète les diverses influences culturelles du pays. Le fameux tagine – à la fois le plat et le pot d'argile conique dans lequel il est cuit – représente le mariage parfait d'ingrédients et de technique qui définit la cuisine marocaine.</p>
        
        <p>Des marchés d'épices aromatiques de Fès aux restaurants de fruits de mer d'Essaouira, chaque repas au Maroc est une aventure. L'utilisation de citrons confits, d'olives, d'huile d'argan et d'un mélange complexe d'épices crée des saveurs à la fois exotiques et réconfortantes.</p>
        
        <h2>Paysages diversifiés dans un seul pays</h2>
        <p>Peu de pays offrent une telle diversité géographique dans leurs frontières. Au Maroc, vous pouvez :</p>
        <ul>
          <li>Surfer sur les vagues atlantiques à Taghazout</li>
          <li>Faire du trekking dans les montagnes du Haut Atlas</li>
          <li>Camper sous les étoiles dans le désert du Sahara</li>
          <li>Explorer les forêts de cèdres du Moyen Atlas</li>
          <li>Vous détendre sur les plages méditerranéennes du nord</li>
        </ul>
        
        <h2>Villes impériales riches en histoire</h2>
        <p>Les quatre villes impériales du Maroc – Marrakech, Fès, Meknès et Rabat – racontent chacune un chapitre différent de l'histoire fascinante du pays. Ces villes abritent certaines des plus belles architectures islamiques du monde, des mosaïques complexes du Palais de la Bahia au minaret imposant de la Mosquée Koutoubia.</p>
        
        <h2>Porte d'entrée vers l'aventure africaine</h2>
        <p>Pour de nombreux voyageurs, le Maroc sert d'introduction parfaite au voyage africain. L'infrastructure touristique bien développée du pays, combinée à son attrait exotique, le rend accessible aux visiteurs novices du continent tout en offrant des expériences africaines authentiques.</p>
        
        <p>Le Maroc prouve que l'Afrique n'est pas une histoire unique mais un continent d'une diversité incroyable, et il vous invite à explorer plus au sud et à découvrir le reste de ce continent magnifique.</p>
        
        <p><strong>Prêt à explorer le Maroc ?</strong> Rejoignez-nous chez Dunia Safari pour un voyage inoubliable à travers ce pays incroyable, surtout pendant l'excitation de la CAN 2025.</p>
      </div>
    `
  },
  {
    id: 3,
    title: "Group Travel Hacks for AFCON Fans",
    title_fr: "Astuces de voyage en groupe pour les fans de la CAN",
    slug: "group-travel-hacks-afcon-fans",
    slug_fr: "astuces-voyage-groupe-fans-can",
    excerpt: "Save more, bond more, and experience AFCON together with these essential travel hacks for groups heading to Morocco.",
    excerpt_fr: "Économisez plus, créez plus de liens et vivez la CAN ensemble avec ces astuces de voyage essentielles pour les groupes se dirigeant vers le Maroc.",
    image: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg",
    author: "Mimi Babs",
    publishDate: "2025-01-05",
    readTime: "6 min read",
    content: `
      <div class="prose prose-lg max-w-none">
        <p>Traveling to AFCON 2025 in Morocco with your crew? Group travel can be incredibly rewarding – you'll share unforgettable moments, split costs, and create bonds that last a lifetime. But it also requires smart planning to ensure everyone has an amazing time. Here are our tried-and-tested hacks for group travel success.</p>
        
        <h2>1. Plan Early, Save Big</h2>
        <p>The golden rule of group travel is to start planning as early as possible. For AFCON 2025, this means:</p>
        <ul>
          <li><strong>Book flights 3-4 months in advance:</strong> Group bookings often come with discounts, and you'll have better seat selection</li>
          <li><strong>Secure accommodations early:</strong> Riads and hotels offer group rates, especially for 6+ people</li>
          <li><strong>Match tickets:</strong> Coordinate to sit together at games – the atmosphere is so much better when you're cheering as one unit</li>
        </ul>
        
        <h2>2. Designate a Group Leader (But Share Responsibilities)</h2>
        <p>Every successful group trip needs someone to take charge of logistics, but don't let one person do everything. Assign roles:</p>
        <ul>
          <li><strong>Trip Coordinator:</strong> Handles bookings and main itinerary</li>
          <li><strong>Budget Manager:</strong> Tracks group expenses and splits</li>
          <li><strong>Activity Planner:</strong> Researches and books tours and experiences</li>
          <li><strong>Food Scout:</strong> Finds great restaurants and handles dining reservations</li>
        </ul>
        
        <h2>3. Use Group Chat Apps Effectively</h2>
        <p>Create a dedicated WhatsApp group for your trip, but set some ground rules:</p>
        <ul>
          <li>Pin important messages (flight details, hotel info, emergency contacts)</li>
          <li>Use @everyone sparingly – only for urgent updates</li>
          <li>Share photos and videos in real-time to keep everyone engaged</li>
          <li>Create separate chats for different activities if your group is large</li>
        </ul>
        
        <h2>4. Master the Art of Group Dining</h2>
        <p>Food is a huge part of the Moroccan experience, but group dining can be tricky:</p>
        <ul>
          <li><strong>Share dishes:</strong> Moroccan cuisine is perfect for sharing – order multiple tagines and couscous dishes for the table</li>
          <li><strong>Set a daily food budget:</strong> Agree on spending limits to avoid awkward money conversations</li>
          <li><strong>Try the "family style" approach:</strong> Everyone orders something different and shares</li>
          <li><strong>Book ahead:</strong> Popular restaurants in Marrakech and Casablanca fill up quickly during AFCON</li>
        </ul>
        
        <h2>5. Handle Money Matters Smartly</h2>
        <p>Money can make or break group trips. Here's how to keep things smooth:</p>
        <ul>
          <li><strong>Use expense-splitting apps:</strong> Splitwise or similar apps track who owes what</li>
          <li><strong>Designate a group fund:</strong> Everyone contributes to a shared pot for group activities</li>
          <li><strong>Agree on tipping:</strong> Decide how you'll handle tips for guides, drivers, and restaurant staff</li>
          <li><strong>Have a contingency fund:</strong> Set aside money for unexpected group activities or emergencies</li>
        </ul>
        
        <h2>6. Plan for Different Energy Levels</h2>
        <p>Not everyone in your group will have the same stamina or interests:</p>
        <ul>
          <li><strong>Build in rest time:</strong> Schedule downtime between activities</li>
          <li><strong>Offer optional activities:</strong> Not everyone needs to do everything together</li>
          <li><strong>Have a "home base" meeting point:</strong> Choose a central location where people can regroup</li>
          <li><strong>Respect different budgets:</strong> Have both budget-friendly and splurge options</li>
        </ul>
        
        <h2>7. Create Shared Memories</h2>
        <p>The best part of group travel is the shared experiences:</p>
        <ul>
          <li><strong>Take group photos:</strong> Designate someone as the group photographer</li>
          <li><strong>Start a group journal:</strong> Pass around a notebook for everyone to write memories</li>
          <li><strong>Collect souvenirs together:</strong> Buy matching items or contribute to a group souvenir fund</li>
          <li><strong>Plan a reunion:</strong> Schedule a get-together after the trip to share photos and plan the next adventure</li>
        </ul>
        
        <h2>8. Prepare for Game Day Like Pros</h2>
        <p>AFCON match days require special group coordination:</p>
        <ul>
          <li><strong>Arrive at stadiums together:</strong> The pre-game atmosphere is half the fun</li>
          <li><strong>Coordinate team colors:</strong> Decide which team you're supporting and dress accordingly</li>
          <li><strong>Plan post-game celebrations:</strong> Win or lose, have a plan for where to go after matches</li>
          <li><strong>Stay hydrated and fed:</strong> Stadium food can be limited, so eat well beforehand</li>
        </ul>
        
        <p><strong>Pro Tip:</strong> The key to successful group travel is flexibility and communication. Things won't always go according to plan, but that's often when the best memories are made. Embrace the chaos, support each other, and get ready for the adventure of a lifetime at AFCON 2025!</p>
        
        <p>Ready to plan your group trip to Morocco? <a href="#contact">Contact Dunia Safari</a> for group packages and expert planning assistance.</p>
      </div>
    `,
    content_fr: `
      <div class="prose prose-lg max-w-none">
        <p>Vous voyagez à la CAN 2025 au Maroc avec votre équipe ? Le voyage en groupe peut être incroyablement gratifiant – vous partagerez des moments inoubliables, diviserez les coûts et créerez des liens qui durent toute une vie. Mais cela nécessite aussi une planification intelligente pour s'assurer que tout le monde passe un moment formidable. Voici nos astuces éprouvées pour le succès du voyage en groupe.</p>
        
        <h2>1. Planifiez tôt, économisez gros</h2>
        <p>La règle d'or du voyage en groupe est de commencer à planifier le plus tôt possible. Pour la CAN 2025, cela signifie :</p>
        <ul>
          <li><strong>Réservez les vols 3-4 mois à l'avance :</strong> Les réservations de groupe viennent souvent avec des réductions, et vous aurez une meilleure sélection de sièges</li>
          <li><strong>Sécurisez les hébergements tôt :</strong> Les riads et hôtels offrent des tarifs de groupe, surtout pour 6+ personnes</li>
          <li><strong>Billets de match :</strong> Coordonnez-vous pour vous asseoir ensemble aux matchs – l'atmosphère est tellement meilleure quand vous encouragez comme une seule unité</li>
        </ul>
        
        <h2>2. Désignez un chef de groupe (mais partagez les responsabilités)</h2>
        <p>Chaque voyage de groupe réussi a besoin de quelqu'un pour prendre en charge la logistique, mais ne laissez pas une seule personne tout faire. Assignez des rôles :</p>
        <ul>
          <li><strong>Coordinateur de voyage :</strong> Gère les réservations et l'itinéraire principal</li>
          <li><strong>Gestionnaire de budget :</strong> Suit les dépenses du groupe et les divisions</li>
          <li><strong>Planificateur d'activités :</strong> Recherche et réserve les tours et expériences</li>
          <li><strong>Éclaireur de nourriture :</strong> Trouve de bons restaurants et gère les réservations de repas</li>
        </ul>
        
        <h2>3. Utilisez efficacement les applications de chat de groupe</h2>
        <p>Créez un groupe WhatsApp dédié pour votre voyage, mais établissez quelques règles de base :</p>
        <ul>
          <li>Épinglez les messages importants (détails de vol, info hôtel, contacts d'urgence)</li>
          <li>Utilisez @everyone avec parcimonie – seulement pour les mises à jour urgentes</li>
          <li>Partagez photos et vidéos en temps réel pour garder tout le monde engagé</li>
          <li>Créez des chats séparés pour différentes activités si votre groupe est grand</li>
        </ul>
        
        <h2>4. Maîtrisez l'art des repas de groupe</h2>
        <p>La nourriture est une énorme partie de l'expérience marocaine, mais les repas de groupe peuvent être délicats :</p>
        <ul>
          <li><strong>Partagez les plats :</strong> La cuisine marocaine est parfaite pour partager – commandez plusieurs tagines et plats de couscous pour la table</li>
          <li><strong>Fixez un budget alimentaire quotidien :</strong> Accordez-vous sur les limites de dépenses pour éviter les conversations d'argent gênantes</li>
          <li><strong>Essayez l'approche "style familial" :</strong> Tout le monde commande quelque chose de différent et partage</li>
          <li><strong>Réservez à l'avance :</strong> Les restaurants populaires à Marrakech et Casablanca se remplissent rapidement pendant la CAN</li>
        </ul>
        
        <h2>5. Gérez intelligemment les questions d'argent</h2>
        <p>L'argent peut faire ou défaire les voyages de groupe. Voici comment garder les choses fluides :</p>
        <ul>
          <li><strong>Utilisez des applications de partage de dépenses :</strong> Splitwise ou des applications similaires suivent qui doit quoi</li>
          <li><strong>Désignez un fonds de groupe :</strong> Tout le monde contribue à un pot partagé pour les activités de groupe</li>
          <li><strong>Accordez-vous sur les pourboires :</strong> Décidez comment vous gérerez les pourboires pour les guides, chauffeurs et personnel de restaurant</li>
          <li><strong>Ayez un fonds de contingence :</strong> Mettez de l'argent de côté pour les activités de groupe inattendues ou les urgences</li>
        </ul>
        
        <h2>6. Planifiez pour différents niveaux d'énergie</h2>
        <p>Tout le monde dans votre groupe n'aura pas la même endurance ou les mêmes intérêts :</p>
        <ul>
          <li><strong>Intégrez du temps de repos :</strong> Programmez des temps d'arrêt entre les activités</li>
          <li><strong>Offrez des activités optionnelles :</strong> Tout le monde n'a pas besoin de tout faire ensemble</li>
          <li><strong>Ayez un point de rencontre "base" :</strong> Choisissez un endroit central où les gens peuvent se regrouper</li>
          <li><strong>Respectez les différents budgets :</strong> Ayez des options économiques et de luxe</li>
        </ul>
        
        <h2>7. Créez des souvenirs partagés</h2>
        <p>La meilleure partie du voyage en groupe, ce sont les expériences partagées :</p>
        <ul>
          <li><strong>Prenez des photos de groupe :</strong> Désignez quelqu'un comme photographe du groupe</li>
          <li><strong>Commencez un journal de groupe :</strong> Faites circuler un carnet pour que chacun écrive des souvenirs</li>
          <li><strong>Collectez des souvenirs ensemble :</strong> Achetez des articles assortis ou contribuez à un fonds de souvenirs de groupe</li>
          <li><strong>Planifiez une réunion :</strong> Programmez un rassemblement après le voyage pour partager des photos et planifier la prochaine aventure</li>
        </ul>
        
        <h2>8. Préparez-vous pour le jour du match comme des pros</h2>
        <p>Les jours de match de la CAN nécessitent une coordination de groupe spéciale :</p>
        <ul>
          <li><strong>Arrivez aux stades ensemble :</strong> L'atmosphère d'avant-match est la moitié du plaisir</li>
          <li><strong>Coordonnez les couleurs d'équipe :</strong> Décidez quelle équipe vous soutenez et habillez-vous en conséquence</li>
          <li><strong>Planifiez les célébrations d'après-match :</strong> Victoire ou défaite, ayez un plan pour où aller après les matchs</li>
          <li><strong>Restez hydratés et nourris :</strong> La nourriture du stade peut être limitée, alors mangez bien avant</li>
        </ul>
        
        <p><strong>Conseil de pro :</strong> La clé du succès du voyage en groupe est la flexibilité et la communication. Les choses ne se dérouleront pas toujours selon le plan, mais c'est souvent là que les meilleurs souvenirs se créent. Embrassez le chaos, soutenez-vous mutuellement, et préparez-vous pour l'aventure d'une vie à la CAN 2025 !</p>
        
        <p>Prêt à planifier votre voyage de groupe au Maroc ? <a href="#contact">Contactez Dunia Safari</a> pour des forfaits de groupe et une assistance de planification experte.</p>
      </div>
    `
  },
  {
    id: 4,
    title: "The Ultimate Guide to Moroccan Hospitality",
    title_fr: "Le guide ultime de l'hospitalité marocaine",
    slug: "ultimate-guide-moroccan-hospitality",
    slug_fr: "guide-ultime-hospitalite-marocaine",
    excerpt: "Discover the warmth and traditions of Moroccan hospitality that will make your AFCON 2025 journey unforgettable.",
    excerpt_fr: "Découvrez la chaleur et les traditions de l'hospitalité marocaine qui rendront votre voyage CAN 2025 inoubliable.",
    image: "https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg",
    author: "Mimi Babs",
    publishDate: "2024-12-28",
    readTime: "4 min read",
    content: `
      <div class="prose prose-lg max-w-none">
        <p>One of the most beautiful aspects of traveling to Morocco is experiencing the legendary hospitality of its people. From the moment you arrive, you'll be welcomed with warmth that goes far beyond simple politeness – it's a cultural tradition that runs deep in Moroccan society.</p>
        
        <h2>The Art of Moroccan Welcome</h2>
        <p>In Morocco, hospitality isn't just about service – it's about honor, tradition, and genuine care for guests. This concept, known as "karam" in Arabic, means that welcoming strangers is not just polite but a sacred duty.</p>
        
        <p>You'll notice this immediately upon arrival. Whether you're staying in a luxury hotel, a traditional riad, or even visiting a local family, the greeting is always warm and often accompanied by mint tea and dates.</p>
        
        <h2>The Ritual of Mint Tea</h2>
        <p>No discussion of Moroccan hospitality is complete without mentioning mint tea, or "atay" as it's known locally. This sweet, refreshing drink is more than just a beverage – it's a symbol of friendship and welcome.</p>
        
        <p>The preparation and serving of mint tea is an art form. Watch as your host carefully pours the tea from a height, creating a frothy top that's considered the mark of perfectly prepared tea. Refusing tea when offered can be considered rude, so embrace this delicious tradition!</p>
        
        <h2>Understanding Moroccan Customs</h2>
        <p>To fully appreciate Moroccan hospitality, it helps to understand some key customs:</p>
        <ul>
          <li><strong>Greetings:</strong> A handshake is common, often followed by placing the hand over the heart</li>
          <li><strong>Shoes:</strong> Remove shoes when entering homes and some traditional restaurants</li>
          <li><strong>Eating:</strong> It's common to eat with your hands, especially bread and tagines</li>
          <li><strong>Generosity:</strong> Hosts will often insist on offering more food or tea – it's their way of showing care</li>
        </ul>
        
        <h2>The Magic of Riad Living</h2>
        <p>Staying in a traditional riad offers the most authentic experience of Moroccan hospitality. These converted family homes, built around central courtyards, provide intimate settings where staff often become like family during your stay.</p>
        
        <p>Riad owners and staff take personal pride in ensuring guests feel at home. Don't be surprised if they remember your preferences, offer local insights, or even invite you to share meals with them.</p>
        
        <p><strong>Experience authentic Moroccan hospitality</strong> during AFCON 2025 with our carefully selected accommodations and local experiences. Contact Dunia Safari to learn more about our Morocco packages.</p>
      </div>
    `,
    content_fr: `
      <div class="prose prose-lg max-w-none">
        <p>L'un des aspects les plus beaux de voyager au Maroc est de découvrir l'hospitalité légendaire de ses habitants. Dès votre arrivée, vous serez accueilli avec une chaleur qui va bien au-delà de la simple politesse – c'est une tradition culturelle profondément enracinée dans la société marocaine.</p>
        
        <h2>L'art de l'accueil marocain</h2>
        <p>Au Maroc, l'hospitalité ne concerne pas seulement le service – il s'agit d'honneur, de tradition et de véritable attention pour les invités. Ce concept, connu sous le nom de "karam" en arabe, signifie qu'accueillir des étrangers n'est pas seulement poli mais un devoir sacré.</p>
        
        <p>Vous le remarquerez immédiatement à votre arrivée. Que vous séjourniez dans un hôtel de luxe, un riad traditionnel, ou même en visitant une famille locale, l'accueil est toujours chaleureux et souvent accompagné de thé à la menthe et de dattes.</p>
        
        <h2>Le rituel du thé à la menthe</h2>
        <p>Aucune discussion sur l'hospitalité marocaine n'est complète sans mentionner le thé à la menthe, ou "atay" comme on l'appelle localement. Cette boisson sucrée et rafraîchissante est plus qu'une simple boisson – c'est un symbole d'amitié et d'accueil.</p>
        
        <p>La préparation et le service du thé à la menthe est un art. Regardez votre hôte verser soigneusement le thé d'une hauteur, créant un dessus mousseux qui est considéré comme la marque d'un thé parfaitement préparé. Refuser le thé quand il est offert peut être considéré comme impoli, alors embrassez cette délicieuse tradition !</p>
        
        <h2>Comprendre les coutumes marocaines</h2>
        <p>Pour apprécier pleinement l'hospitalité marocaine, il est utile de comprendre quelques coutumes clés :</p>
        <ul>
          <li><strong>Salutations :</strong> Une poignée de main est courante, souvent suivie de placer la main sur le cœur</li>
          <li><strong>Chaussures :</strong> Enlevez les chaussures en entrant dans les maisons et certains restaurants traditionnels</li>
          <li><strong>Manger :</strong> Il est courant de manger avec les mains, surtout le pain et les tagines</li>
          <li><strong>Générosité :</strong> Les hôtes insisteront souvent pour offrir plus de nourriture ou de thé – c'est leur façon de montrer leur attention</li>
        </ul>
        
        <h2>La magie de la vie en riad</h2>
        <p>Séjourner dans un riad traditionnel offre l'expérience la plus authentique de l'hospitalité marocaine. Ces anciennes maisons familiales converties, construites autour de cours centrales, offrent des cadres intimes où le personnel devient souvent comme une famille pendant votre séjour.</p>
        
        <p>Les propriétaires et le personnel des riads prennent un orgueil personnel à s'assurer que les invités se sentent chez eux. Ne soyez pas surpris s'ils se souviennent de vos préférences, offrent des aperçus locaux, ou même vous invitent à partager des repas avec eux.</p>
        
        <p><strong>Découvrez l'hospitalité marocaine authentique</strong> pendant la CAN 2025 avec nos hébergements soigneusement sélectionnés et nos expériences locales. Contactez Dunia Safari pour en savoir plus sur nos forfaits Maroc.</p>
      </div>
    `
  },
  {
    id: 5,
    title: "Exploring Morocco's Hidden Gems Beyond the Tourist Trail",
    title_fr: "Explorer les joyaux cachés du Maroc au-delà des sentiers touristiques",
    slug: "morocco-hidden-gems-beyond-tourist-trail",
    slug_fr: "joyaux-caches-maroc-au-dela-sentiers-touristiques",
    excerpt: "Venture off the beaten path and discover Morocco's secret treasures that most tourists never see.",
    excerpt_fr: "Aventurez-vous hors des sentiers battus et découvrez les trésors secrets du Maroc que la plupart des touristes ne voient jamais.",
    image: "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg",
    author: "Mimi Babs",
    publishDate: "2024-12-20",
    readTime: "8 min read",
    content: `
      <div class="prose prose-lg max-w-none">
        <p>While Morocco's famous destinations like Marrakech, Fez, and Casablanca are undoubtedly spectacular, the country's true magic often lies in its hidden corners. During your AFCON 2025 adventure, consider venturing beyond the well-trodden tourist paths to discover Morocco's secret treasures.</p>
        
        <h2>Chefchaouen: The Blue Pearl</h2>
        <p>Nestled in the Rif Mountains, Chefchaouen is a photographer's dream with its blue-painted buildings cascading down hillsides. This small city offers a peaceful contrast to Morocco's bustling imperial cities.</p>
        
        <p>Wander through narrow streets painted in every shade of blue imaginable, from powder blue to deep indigo. Local legend says the blue color repels mosquitoes, while others believe it represents the sky and heaven. Whatever the reason, the effect is magical.</p>
        
        <h2>Aït Benhaddou: A Living Movie Set</h2>
        <p>This UNESCO World Heritage site is a fortified village (ksar) that has served as the backdrop for countless Hollywood films, including "Gladiator" and "Game of Thrones." But beyond its cinematic fame, Aït Benhaddou offers insight into traditional Moroccan architecture and desert life.</p>
        
        <p>Climb to the top of the ksar for panoramic views of the surrounding desert landscape, and explore the narrow passages between ancient buildings made of clay and straw.</p>
        
        <h2>Essaouira: Where Ocean Meets Desert</h2>
        <p>This coastal gem offers a refreshing break from inland heat with its Atlantic breezes and laid-back atmosphere. Essaouira's medina is less overwhelming than those in larger cities, making it perfect for leisurely exploration.</p>
        
        <p>Watch traditional fishing boats return with their daily catch, explore art galleries showcasing local talent, and enjoy some of Morocco's best seafood while listening to Gnawa music in seaside cafes.</p>
        
        <h2>The Dades Valley: Morocco's Grand Canyon</h2>
        <p>Known as the "Valley of a Thousand Kasbahs," the Dades Valley offers dramatic landscapes of red rock formations, ancient fortresses, and traditional Berber villages. The winding road through the valley provides some of Morocco's most spectacular scenery.</p>
        
        <p>Stay in a traditional kasbah hotel and wake up to views of snow-capped Atlas peaks in the distance. This is Morocco at its most cinematic and authentic.</p>
        
        <h2>Merzouga: Gateway to the Sahara</h2>
        <p>While not exactly hidden, Merzouga offers access to the most accessible part of the Sahara Desert. The experience of riding camels into the dunes at sunset and spending a night under the stars is transformative.</p>
        
        <p>The silence of the desert, broken only by the wind across the dunes, provides a profound contrast to the energy of AFCON stadiums. It's a reminder of Morocco's incredible diversity.</p>
        
        <h2>Local Experiences Off the Beaten Path</h2>
        <ul>
          <li><strong>Berber Villages:</strong> Visit traditional mountain communities and learn about ancient ways of life</li>
          <li><strong>Argan Oil Cooperatives:</strong> See how women's cooperatives produce Morocco's liquid gold</li>
          <li><strong>Traditional Hammams:</strong> Experience authentic Moroccan spa culture in local bathhouses</li>
          <li><strong>Souk Shopping:</strong> Venture into neighborhood markets where locals shop, away from tourist souks</li>
        </ul>
        
        <h2>Planning Your Hidden Gems Adventure</h2>
        <p>Exploring Morocco's hidden gems requires more planning than sticking to major cities, but the rewards are immense. Consider:</p>
        <ul>
          <li>Renting a car for maximum flexibility</li>
          <li>Hiring local guides who know secret spots</li>
          <li>Staying in family-run accommodations for authentic experiences</li>
          <li>Learning basic Arabic or French phrases</li>
        </ul>
        
        <p><strong>Ready to explore Morocco beyond the tourist trail?</strong> Our Morocco packages include options for adventurous travelers who want to see the real Morocco alongside AFCON 2025 excitement.</p>
      </div>
    `,
    content_fr: `
      <div class="prose prose-lg max-w-none">
        <p>Bien que les destinations célèbres du Maroc comme Marrakech, Fès et Casablanca soient indéniablement spectaculaires, la vraie magie du pays réside souvent dans ses coins cachés. Pendant votre aventure CAN 2025, considérez vous aventurer au-delà des sentiers touristiques bien fréquentés pour découvrir les trésors secrets du Maroc.</p>
        
        <h2>Chefchaouen : La perle bleue</h2>
        <p>Nichée dans les montagnes du Rif, Chefchaouen est le rêve d'un photographe avec ses bâtiments peints en bleu qui cascadent sur les collines. Cette petite ville offre un contraste paisible avec les villes impériales animées du Maroc.</p>
        
        <p>Promenez-vous dans les rues étroites peintes dans toutes les nuances de bleu imaginables, du bleu poudre à l'indigo profond. La légende locale dit que la couleur bleue repousse les moustiques, tandis que d'autres croient qu'elle représente le ciel et le paradis. Quelle que soit la raison, l'effet est magique.</p>
        
        <h2>Aït Benhaddou : Un plateau de cinéma vivant</h2>
        <p>Ce site du patrimoine mondial de l'UNESCO est un village fortifié (ksar) qui a servi de toile de fond à d'innombrables films hollywoodiens, notamment "Gladiator" et "Game of Thrones". Mais au-delà de sa renommée cinématographique, Aït Benhaddou offre un aperçu de l'architecture marocaine traditionnelle et de la vie du désert.</p>
        
        <p>Grimpez au sommet du ksar pour des vues panoramiques sur le paysage désertique environnant, et explorez les passages étroits entre les bâtiments anciens faits d'argile et de paille.</p>
        
        <h2>Essaouira : Où l'océan rencontre le désert</h2>
        <p>Ce joyau côtier offre une pause rafraîchissante de la chaleur intérieure avec ses brises atlantiques et son atmosphère décontractée. La médina d'Essaouira est moins écrasante que celles des grandes villes, la rendant parfaite pour une exploration tranquille.</p>
        
        <p>Regardez les bateaux de pêche traditionnels revenir avec leur prise quotidienne, explorez les galeries d'art présentant les talents locaux, et savourez certains des meilleurs fruits de mer du Maroc en écoutant la musique Gnawa dans les cafés en bord de mer.</p>
        
        <h2>La vallée du Dadès : Le Grand Canyon du Maroc</h2>
        <p>Connue sous le nom de "Vallée des mille kasbahs", la vallée du Dadès offre des paysages dramatiques de formations rocheuses rouges, de forteresses anciennes et de villages berbères traditionnels. La route sinueuse à travers la vallée offre certains des paysages les plus spectaculaires du Maroc.</p>
        
        <p>Séjournez dans un hôtel kasbah traditionnel et réveillez-vous avec des vues sur les sommets enneigés de l'Atlas au loin. C'est le Maroc à son plus cinématographique et authentique.</p>
        
        <h2>Merzouga : Porte d'entrée vers le Sahara</h2>
        <p>Bien que pas exactement caché, Merzouga offre l'accès à la partie la plus accessible du désert du Sahara. L'expérience de monter des chameaux dans les dunes au coucher du soleil et de passer une nuit sous les étoiles est transformatrice.</p>
        
        <p>Le silence du désert, brisé seulement par le vent à travers les dunes, offre un contraste profond avec l'énergie des stades de la CAN. C'est un rappel de l'incroyable diversité du Maroc.</p>
        
        <h2>Expériences locales hors des sentiers battus</h2>
        <ul>
          <li><strong>Villages berbères :</strong> Visitez les communautés montagnardes traditionnelles et apprenez sur les modes de vie anciens</li>
          <li><strong>Coopératives d'huile d'argan :</strong> Voyez comment les coopératives de femmes produisent l'or liquide du Maroc</li>
          <li><strong>Hammams traditionnels :</strong> Découvrez la culture spa marocaine authentique dans les bains locaux</li>
          <li><strong>Shopping dans les souks :</strong> Aventurez-vous dans les marchés de quartier où les locaux font leurs achats, loin des souks touristiques</li>
        </ul>
        
        <h2>Planifier votre aventure des joyaux cachés</h2>
        <p>Explorer les joyaux cachés du Maroc nécessite plus de planification que de s'en tenir aux grandes villes, mais les récompenses sont immenses. Considérez :</p>
        <ul>
          <li>Louer une voiture pour une flexibilité maximale</li>
          <li>Embaucher des guides locaux qui connaissent les endroits secrets</li>
          <li>Séjourner dans des hébergements familiaux pour des expériences authentiques</li>
          <li>Apprendre des phrases de base en arabe ou en français</li>
        </ul>
        
        <p><strong>Prêt à explorer le Maroc au-delà des sentiers touristiques ?</strong> Nos forfaits Maroc incluent des options pour les voyageurs aventureux qui veulent voir le vrai Maroc aux côtés de l'excitation de la CAN 2025.</p>
      </div>
    `
  }
];