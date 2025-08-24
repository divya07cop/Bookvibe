// E-commerce: Shopping Cart Functionality - Make these global
let cart;
let wishlist;
let orders;

try {
    const storedCart = localStorage.getItem('bookVibeCart');
    cart = storedCart ? JSON.parse(storedCart) : [];
} catch (e) {
    console.error("Error loading cart from localStorage:", e);
    cart = []; // Fallback to an empty cart
}

try {
    const storedWishlist = localStorage.getItem('bookVibeWishlist');
    wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
} catch (e) {
    console.error("Error loading wishlist from localStorage:", e);
    wishlist = []; // Fallback to an empty wishlist
}

try {
    const storedOrders = localStorage.getItem('bookVibeOrders');
    orders = storedOrders ? JSON.parse(storedOrders) : [];
} catch (e) {
    console.error("Error loading orders from localStorage:", e);
    orders = []; // Fallback to an empty array
}

// Sample Book Data (Ideally, this would come from a backend or a separate JSON file)
const booksData = [
    // Removed duplicate book with id: 1 (Fourth Wing), keeping id: 21
    {
        id: 2,
        title: "It Starts With Us",
        author: "Colleen Hoover",
        price: 499, // Price as a whole number
        image: "assets/books/bestsellers/itstartswithus.jpg", // Example local path
        description: `Before it ends, it begins again.
Colleen Hoover returns with the powerful, heart-stirring sequel to It Ends With Us — this time from Atlas’s point of view. It Starts With Us gives readers the long-awaited love story between Lily and Atlas, offering healing, hope, and the kind of second chance that makes your heart ache in the best way.
✨ Raw, romantic, and emotionally addictive — perfect for fans of slow-burn love, emotional growth, and beautifully flawed characters.
🔖 "Sometimes the one who heals you is the one who was always meant to stay."`,
        genre: "Romance",
        publicationDate: "2022",
        moods: ["Inspiring", "Thought-Provoking"],
        language: "English"
    },
    {
        id: 3,
        title: "Lessons in Chemistry",
        author: "Bonnie Garmus",
        price: 499, // Price as a whole number
        image: "assets/books/bestsellers/lessonsinchemistry.jpg", // Example local path
        description: `She’s not just stirring the pot—she’s changing the recipe.
Meet Elizabeth Zott, a brilliant chemist in the 1960s who’s not afraid to challenge the rules—of science, society, and sexism. When she’s pushed out of the lab and onto a TV cooking show, she turns housewives into thinkers and the kitchen into a classroom. Smart, sharp, and delightfully rebellious, Lessons in Chemistry is a tribute to every woman who’s ever been underestimated.

✨ Bold, witty, and deeply moving—this is more than a story. It’s a revolution in a lab coat.

    🧪 "Cooking is chemistry. And chemistry means change."`,
        genre: "Historical Fiction",
        publicationDate: "2022",
        moods: ["Mysterious", "Emotional", "Historical"],
        language: "English"
    },
    {
        id: 4,
        title: "Happy Place",
        author: "Emily Henry",
        price: 499, // Price as a whole number
        image: "assets/books/bestsellers/happyplace.jpg", // Example local path
        description: `They broke up months ago. They just haven’t told anyone yet.
Harriet and Wyn were the perfect couple—until they weren’t. But when their annual getaway with friends rolls around, they find themselves pretending to still be together to avoid breaking the group’s fragile peace. As memories resurface and emotions bubble beneath the surface, they must ask themselves: was their happy place ever really lost—or just waiting to be reclaimed?

💗 A tender, witty, and achingly honest love story about second chances, chosen family, and the spaces we call home. Emily Henry does it again—this one's for the hopeless romantics.

    🏡 "Sometimes the right person comes at the wrong time… but love has a way of circling back."`,
        genre: "Romance",
        publicationDate: "2023",
        moods: ["Mysterious", "Intelligent"],
        language: "English"
    },
    {
        id: 5,
        title: "Verity",
        author: "Colleen Hoover",
        price: 499, // Price as a whole number
        image: "assets/books/bestsellers/verity.jpg", // Example local path
        description: `Truth is scarier than fiction.
Lowen Ashleigh, a struggling writer, is hired to finish bestselling author Verity Crawford’s novels after Verity suffers a mysterious accident. But inside her eerie home, Lowen uncovers an unpublished autobiography filled with chilling confessions. As obsession takes root and boundaries blur, she must decide—how far is she willing to go for the truth?

🕯️ Sinister, seductive, and impossible to put down—Verity is Colleen Hoover like you’ve never read her before.

    📓 "Some secrets should stay buried... but some scream to be heard."`,
        genre: "Thriller",
        publicationDate: "2018",
        moods: ["Adventurous", "Inspiring", "Intelligent"],
        language: "English"
    },
    {
        id: 6,
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        price: 499, // Price as a whole number
        image: "assets/books/bestsellers/thesevenhusbandsofevelynhugo.jpg", // Example local path
        description: `Everyone knows her name. No one knows her truth.
Aging Hollywood icon Evelyn Hugo is finally ready to tell her scandalous life story—on her own terms. From rising stardom to seven headline-making marriages, she unveils a tale of ruthless ambition, forbidden love, and sacrifices made in the name of fame. But as journalist Monique Grant listens closely, she realizes Evelyn’s past is entwined with her own future in ways she never imagined.

💚 Dazzling, intimate, and heartbreakingly human—The Seven Husbands of Evelyn Hugo is a timeless story about the price of fame and the power of choosing love, no matter the cost.

    🎞️ "Never let anyone make you feel ordinary."`,
        genre: "Romance",
        publicationDate: "2017",
        moods: ["Romantic", "Cozy", "Funny"],
        language: "English"
    },
    {
        id: 7,
        title: "The Spanish Love Deception",
        author: "Elena Armas",
        price: 499, // Price as a whole number
        image: "assets/books/bestsellers/thespanishlovedeception.jpg", // Example local path
        description: `One fake date. A wedding in Spain. What could possibly go wrong?
Catalina Martín needs a date to her sister’s wedding in Spain—especially with her ex (and his fiancée) attending. Enter Aaron Blackford: tall, brooding, and insufferable… and now pretending to be her boyfriend. As sparks fly and lines blur, Catalina must confront the possibility that their fake romance might just be the real thing.

💌 Equal parts hilarious, heartwarming, and undeniably steamy—The Spanish Love Deception is a deliciously slow-burn romance that will have you smiling, swooning, and believing in love all over again.

    ❤️ "The line between pretending and falling is thinner than you think."

`,
        genre: "Romance",
        publicationDate: "2021",
        moods: ["Historical", "Emotional"],
        language: "Spanish"
    },
    // Removed duplicate book with id: 8 (Babel), keeping id: 24
    // Removed duplicate book with id: 9 (The Atlas Six), keeping id: 23
    // Removed duplicate book with id: 10 (Tomorrow, and Tomorrow, and Tomorrow), keeping id: 19
    {
        id: 11,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        price: 449, // Price as a whole number
        image: "assets/books/bestsellers/thesilentpatient.jpg", // Example local path
        description: `She murdered her husband. And then she never spoke again.
Alicia Berenson had the perfect life—until she shot her husband five times and went completely silent. Her refusal to speak turns a shocking crime into a national obsession. Enter Theo Faber, a criminal psychotherapist determined to uncover the truth behind Alicia’s silence. But the closer he gets, the darker—and more twisted—the story becomes.

🕯️ A haunting, mind-bending thriller with a jaw-dropping twist you won’t see coming—The Silent Patient will keep you questioning everything until the final page.

    🔐 "Sometimes the biggest secrets are the ones we keep from ourselves."`,
        genre: "Thriller",
        publicationDate: "2019",
        moods: ["Funny", "Lighthearted", "Cozy"],
        language: "English"
    },
    {
        id: 12,
        title: "Book Lovers",
        author: "Emily Henry",
        price: 499, // Price as a whole number
        image: "assets/books/bestsellers/booklovers.jpg", // Example local path
        description: `She’s read this story before. But this time, the ending might surprise her.
Nora Stephens is a sharp-tongued literary agent who knows all the tropes—especially the one where career women get dumped for small-town sweethearts. So when she ends up in Sunshine Falls with her sister for a month-long escape, the last person she expects to keep bumping into is Charlie Lastra, a brooding editor from the city. As the pages of their story unfold, Nora must decide whether love can be found in the most unexpected plot twist of all—her own.

📖 Witty, emotional, and full of love for book lovers everywhere—Emily Henry delivers another swoon-worthy tale of second chances, sharp banter, and happily-ever-afters that feel earned.

    💞 "Some stories rewrite you, even when you thought you knew the ending."

`,
        genre: "Romance",
        publicationDate: "2022",
        moods: ["Educational", "Inspiring", "Historical", "Intelligent"],
        language: "English"
    },
    {
        id: 13,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        price: 499,
        image: "assets/books/thehobbit.jpg",
        description: `Bilbo Baggins never asked for adventure. But when a wandering wizard and a band of dwarves appear at his door, he’s swept into a journey across Middle-earth—through ancient forests, goblin tunnels, and to the very lair of a fire-breathing dragon. Along the way, Bilbo discovers a courage he never knew he had—and a ring that will shape the fate of the world.

💫 Enchanting, witty, and brimming with magic—The Hobbit is a beloved prelude to Tolkien’s epic saga, and a must-read for dreamers and wanderers alike.

🧝‍♂️ "There is more in you of good than you know, child of the kindly West."`,
        genre: "Fantasy",
        publicationDate: "1937",
        moods: ["Adventurous", "Cozy"],
        language: "English"
    },
    {
        id: 14,
        title: "The Martian",
        author: "Andy Weir",
        price: 450,
        image: "assets/books/themartian.jpg",
        description: `He was left for dead. But he's not done fighting.

When astronaut Mark Watney is stranded alone on Mars after a mission gone wrong, he's faced with impossible odds. Armed with nothing but his engineering genius, unshakable wit, and a fierce will to survive, he must turn a barren planet into a lifeline—one ingenious hack at a time.

🌌 Brilliantly funny, scientifically thrilling, and emotionally gripping—The Martian is a survival story like no other, celebrating human resilience at its finest.

🛠️ "I’m gonna have to science the hell out of this."`,
        genre: "Science Fiction",
        publicationDate: "2011",
        moods: ["Adventurous", "Intelligent"],
        language: "English"
    },
    {
        id: 15,
        title: "Life of Pi",
        author: "Yann Martel",
        price: 399,
        image: "assets/books/lifeofpi.jpg",
        description: `One boy. One boat. One tiger. Infinite wonder.

After a shipwreck leaves him stranded in the Pacific Ocean, sixteen-year-old Pi Patel must survive in a lifeboat—with only a Bengal tiger named Richard Parker for company. What follows is a spellbinding odyssey that blurs the line between truth and faith, fear and beauty, survival and storytelling.

🪷 Lush, lyrical, and deeply spiritual—Life of Pi is a masterwork of imagination and resilience that dares you to believe in the extraordinary.

🐅 "The world isn’t just the way it is. It’s how we understand it."`,
        genre: "Adventure",
        publicationDate: "2001",
        moods: ["Adventurous", "Emotional"],
        language: "French"
    },
    {
        id: 16,
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 350,
        image: "assets/books/thealchemist.jpg",
        description: `Follow your heart. It knows the way.

Santiago, a young Andalusian shepherd, dreams of finding a hidden treasure buried far beyond the desert. But what he discovers instead is a journey of self-discovery—guided by omens, alchemy, and the whispers of the universe. Every step takes him closer to understanding the true meaning of his Personal Legend.

✨ Timeless, poetic, and profoundly wise—The Alchemist is a luminous tale about destiny, dreams, and the magic of listening to your soul.

🔮 "And, when you want something, all the universe conspires in helping you to achieve it."`,
        genre: "Adventure", // Could also be Philosophical Fiction or Literary Fiction
        publicationDate: "1988",
        moods: ["Inspiring", "Thought-Provoking"]
    },
    {
        id: 17,
        title: "Little Fires Everywhere",
        author: "Celeste Ng",
        price: 499,
        image: "assets/books/littlefires.jpg",
        description: `In Shaker Heights, everything is planned—until it burns.

When artist and single mother Mia Warren arrives with her daughter in an idyllic suburban town, their lives quietly ignite long-buried secrets in the picture-perfect Richardson family. As ideals clash and loyalties fracture, the spark of one small decision sets everything ablaze.

🔥 Rich in emotion and moral complexity, Little Fires Everywhere is a searing exploration of motherhood, privilege, and the illusion of perfection.

🕯️ "Sometimes you need to scorch everything to the ground and start over."`,
        genre: "Contemporary Fiction",
        publicationDate: "2017",
        moods: ["Emotional", "Thought-Provoking"]
    },
    {
        id: 18,
        title: "The Midnight Library",
        author: "Matt Haig",
        price: 399,
        image: "assets/books/midnightlibrary.jpg",
        description: `Between life and death, there is a library.

Nora Seed finds herself in a mysterious library where every book offers a chance to live a different version of her life. From unrealized dreams to paths not taken, she explores the infinite possibilities of “what could have been”—and discovers what truly makes life worth living.

🌌 Thoughtful, uplifting, and quietly magical—The Midnight Library is a beautiful reminder that every life holds value, and every moment a spark of hope.

✨ "You don’t have to understand life. You just have to live it."`,
        genre: "Contemporary Fiction", // Added missing genre
        publicationDate: "2020",
        moods: ["Cozy", "Inspiring"]
    },
    {
        id: 19,
        title: "Tomorrow, and Tomorrow, and Tomorrow",
        author: "Gabrielle Zevin",
        price: 499,
        image: "assets/books/tomorrowandtomorrow.jpg",
        description: `More than a love story. It’s a story about love—in all its forms.
When Sam and Sadie meet in a hospital game room as kids, a bond forms over pixels and imagination. Years later, they reunite to build a groundbreaking video game—and a lifelong creative partnership. Spanning decades, coasts, and personal battles, Tomorrow, and Tomorrow, and Tomorrow is a poignant exploration of friendship, art, ambition, and the infinite lives we get to live in the games we create… and the people we love.

🕹️ Thoughtful, nostalgic, and deeply human—this is a novel for anyone who’s ever searched for meaning through play, creation, or connection.

    💔 "What is a game, if not a world you get to live in—if only for a while?"`,
        genre: "Contemporary Fiction",
        publicationDate: "2022",
        moods: ["Intelligent", "Emotional"]
    },
    {
        id: 20,
        title: "The Paper Palace",
        author: "Miranda Cowley Heller",
        price: 449,
        image: "assets/books/paperpalace.jpg",
        description: `One summer day. One life-changing choice.

In the golden stillness of a Cape Cod morning, Elle Bishop makes a decision that will ripple through the past and future of her life. Torn between the comfort of her marriage and the passion of a childhood love, she is forced to confront long-buried secrets, trauma, and the complexity of desire.

💔 Lyrical, raw, and deeply human—The Paper Palace is a powerful meditation on memory, identity, and the consequences of the paths we choose.

🌊 "Things can be true and not true, both at the same time."`,
        genre: "Contemporary Fiction",
        publicationDate: "2021",
        moods: ["Cozy", "Emotional"]
    },
    {
        id: 21,
        title: "Fourth Wing",
        author: "Rebecca Yarros",
        price: 599,
        image: "assets/books/fourthwing2.jpg",
        description: `Enter the elite war college where dragons choose their riders—and only the strong survive.
Violet Sorrengail was meant to live a quiet life among books, not dragons. But fate throws her into Basgiath War College, where ruthless training, deadly trials, and cutthroat competition are just the beginning.🔥 Packed with fiery romance, deadly magic, and jaw-dropping twists—Fourth Wing is a brutal, beautiful ride you won't want to end.
🐲 "Dragons don't bond with fragile girls. But what if she's stronger than anyone thinks?"`,
        genre: "Fantasy",
        publicationDate: "2023",
        moods: ["Adventurous", "Romantic"]
    },
    {
        id: 22,
        title: "A Court of Thorns and Roses",
        author: "Sarah J. Maas",
        price: 549,
        image: "assets/books/courtofthornsandroses.jpg",
        description: `A mortal girl. A cursed land. A deadly bargain.

When nineteen-year-old Feyre kills a wolf in the woods, she’s dragged into a fae realm for retribution—only to find her captor is a brooding High Fae lord. As she navigates courtly intrigues and ancient magic, Feyre’s hatred begins to transform into something far more dangerous: desire. But a shadow threatens everything... and love may be the key to survival.

🖤 Seductive, fierce, and spellbinding—A Court of Thorns and Roses is a gripping fantasy of passion, sacrifice, and power.

🌒 "Don’t feel bad for one moment about doing what brings you joy."`,
        genre: "Fantasy",
        publicationDate: "2015",
        moods: ["Romantic", "Mysterious"]
    },
    {
        id: 23,
        title: "The Atlas Six",
        author: "Olivie Blake",
        price: 499,
        image: "assets/books/theatlassix.jpg",
        description: `Six magicians. Five will remain. Only the best can survive.
Each decade, six of the world’s most talented magical thinkers are invited to join the secretive Alexandrian Society—guardians of ancient knowledge lost to time. For the chosen few, entry means power, prestige, and privilege. But as they uncover the truth behind the Society’s purpose, the lines between loyalty and ambition begin to blur—and someone may not make it out alive.

🖤 Seductively intellectual, morally gray, and brimming with tension—The Atlas Six is a dazzling, character-driven fantasy for fans of arcane secrets, high stakes, and mind games.

    🗝️ "Knowledge is carnage. You can't have it without sacrifice."`,
        genre: "Fantasy",
        publicationDate: "2020",
        moods: ["Mysterious", "Intelligent"]
    },
    {
        id: 24,
        title: "Babel",
        author: "R.F. Kuang",
        price: 599,
        image: "assets/books/babel.jpg",
        description: `At Oxford, magic is translation—and knowledge is power.
In 1830s England, orphaned Robin Swift is brought from Canton to train at Oxford’s prestigious Royal Institute of Translation—known as Babel. There, language is literal magic, used to uphold Britain’s global dominance. But as Robin discovers the dark cost of empire and scholarship, he must choose between loyalty to the institution that raised him… or revolution.

📚 Brilliantly layered, fiercely intelligent, and devastatingly relevant—Babel is a genre-defying masterpiece that challenges colonialism, language, and the price of power.

    ✨ "Revolution begins with words—and ends with fire."`,
        genre: "Fantasy",
        publicationDate: "2022",
        moods: ["Historical", "Thought-Provoking"]
    },
    {
        id: 25,
        title: "Iron Flame",
        author: "Rebecca Yarros",
        price: 649,
        image: "assets/books/bestsellers/ironflame.jpg",
        description: `The story is far from over.
After surviving the brutal first year at Basgiath War College, Violet Sorrengail fears she’ll die in her second. The training is grueling, the new vice commandant seems to have a personal vendetta, and her body is still weak. But Violet has a will of iron and a secret that could shatter the kingdom.

🐉 Bigger, bolder, and more heart-pounding—Iron Flame continues the epic saga of dragons, war, and a love that defies all odds.

    🔥 "A dragon without its rider is a tragedy. A rider without their dragon is dead."`,
        genre: "Fantasy",
        publicationDate: "2023",
        moods: ["Adventurous", "Romantic", "Emotional"]
    },
    {
        id: 26,
        title: "The Housemaid",
        author: "Freida McFadden",
        price: 429,
        image: "assets/books/bestsellers/thehousemaid.jpg",
        description: `Welcome to the family. But you’ll never be one of them.
Every day, Millie cleans the beautiful home of the Winchesters. Every day, she tries to ignore how broken their family is. But when she stumbles upon secrets locked away in the attic, she realizes the real danger isn’t just in the mess she cleans up—it’s in the family itself.

🔒 A chilling, twisty psychological thriller that will make you question who to trust. The perfect read for a dark and stormy night.

    🗝️ "The perfect life is the perfect lie."`,
        genre: "Thriller",
        publicationDate: "2022",
        moods: ["Mysterious", "Intelligent"]
    },
    {
        id: 27,
        title: "Atomic Habits",
        author: "James Clear",
        price: 599,
        image: "assets/books/bestsellers/atomichabits.jpg",
        description: `Tiny changes, remarkable results.
No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.

📈 A practical, inspiring guide to redesigning your habits and unlocking your full potential.

    ⚙️ "You do not rise to the level of your goals. You fall to the level of your systems."`,
        genre: "Self-Help",
        publicationDate: "2018",
        moods: ["Inspiring", "Thought-Provoking", "Intelligent"]
    },
    {
        id: 28,
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        price: 499,
        image: "assets/books/bestsellers/wherethecrawdadssing.jpg",
        description: `For years, rumors of the “Marsh Girl” have haunted Barkley Cove, a quiet town on the North Carolina coast.
So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl. But Kya is not what they say. Sensitive and intelligent, she has survived for years alone in the marsh that she calls home.

🌿 A heartbreaking coming-of-age story and a surprising tale of possible murder. Owens reminds us that we are forever shaped by the children we once were.

    🐚 "I wasn't aware that words could hold so much. I didn't know a sentence could be so full."`,
        genre: "Contemporary Fiction",
        publicationDate: "2018",
        moods: ["Mysterious", "Emotional", "Cozy"]
    }
];

const authorsData = [
    {
        id: 1,
        name: "Colleen Hoover",
        image: "assets/authors/colleen_hoover.jpg",
        bio: "A master of emotional storytelling, her novels often explore the complexities of love, loss, and resilience, captivating readers with their raw honesty.",
        bookIds: [
            "American",
            "Romance",
            "Thriller",
            2,
            5
        ]
    },
    {
        id: 2,
        name: "Bonnie Garmus",
        image: "assets/authors/bonnie_garmus.jpg",
        bio: "Author of the bestselling novel 'Lessons in Chemistry', known for her sharp wit and compelling characters.",
        nationality: "American",
        genre: "Historical Fiction",
        bookIds: [
            3
        ]
    },
    {
        id: 3,
        name: "Emily Henry",
        image: "assets/authors/emily_henry.jpg",
        bio: "A go-to author for contemporary love stories that are both smart and swoon-worthy, known for her witty banter and charming characters.",
         nationality: "American",
        genre: "Romance",
        bookIds: [
            4,
            12
        ]
    },
    {
        id: 4,
        name: "Taylor Jenkins Reid",
        image: "assets/authors/taylor_jenkins_reid.jpg",
        bio: "Crafts immersive, emotionally resonant stories that often delve into the worlds of fame, ambition, and complex relationships.",
         nationality: "American",
        genre: "Romance",
        bookIds: [
            6
        ]
    },
    {
        id: 5,
        name: "Elena Armas",
        image: "assets/authors/elena_armas.jpg",
        bio: "A writer of steamy, heartfelt contemporary romance novels, including the hit 'The Spanish Love Deception'.",
         nationality: "Spanish",
        genre: "Romance",
        bookIds: [
            7
        ]
    },
    {
        id: 6,
        name: "Alex Michaelides",
        image: "assets/authors/alex_michaelides.jpg",
        bio: "Bestselling author of psychological thrillers, famous for the jaw-dropping twist in 'The Silent Patient'.",
         nationality: "Cypriot-British",
        genre: "Thriller",
        bookIds: [
            11
        ]
    },
    {
        id: 7,
        name: "J.R.R. Tolkien",
        image: "assets/authors/jrr_tolkien.jpg",
        bio: "An English writer, poet, and philologist, best known as the author of the high fantasy works 'The Hobbit' and 'The Lord of the Rings'.",
         nationality: "British",
        genre: "Fantasy",
        bookIds: [
            13
        ]
    },
    {
        id: 8,
        name: "Andy Weir",
        image: "assets/authors/andy_weir.jpg",
        bio: "Known for his scientifically accurate and thrilling science fiction novels, including the bestseller 'The Martian'.",
         nationality: "American",
        genre: "Science Fiction",
        bookIds: [
            14
        ]
    },
    {
        id: 9,
        name: "Yann Martel",
        image: "assets/authors/yann_martel.jpg",
        bio: "A Canadian author best known for the Man Booker Prize-winning novel 'Life of Pi', a work of magical realism.",
         nationality: "Canadian",
        genre: "Adventure",
        bookIds: [
            15
        ]
    },
    {
        id: 10,
        name: "Paulo Coelho",
        image: "assets/authors/paulo_coelho.jpg",
        bio: "A Brazilian lyricist and novelist, best known for his international bestseller 'The Alchemist'.",
         nationality: "Brazilian",
        genre: "Adventure",
        bookIds: [
            16
        ]
    },
    {
        id: 11,
        name: "Celeste Ng",
        image: "assets/authors/celeste_ng.jpg",
        bio: "An American writer and novelist, known for her novels 'Everything I Never Told You' and 'Little Fires Everywhere'.",
         nationality: "American",
        genre: "Contemporary Fiction",
        bookIds: [
            17
        ]
    },
    {
        id: 12,
        name: "Matt Haig",
        image: "assets/authors/matt_haig.jpg",
        bio: "An English author and journalist, known for his speculative fiction and the bestselling novel 'The Midnight Library'.",
         nationality: "British",
        genre: "Contemporary Fiction",
        bookIds: [
            18
        ]
    },
    {
        id: 13,
        name: "Gabrielle Zevin",
        image: "assets/authors/gabrielle_zevin.jpg",
        bio: "An American author and screenwriter, known for the critically acclaimed novel 'Tomorrow, and Tomorrow, and Tomorrow'.",
         nationality: "American",
        genre: "Contemporary Fiction",
        bookIds: [
            19
        ]
    },
    {
        id: 14,
        name: "Miranda Cowley Heller",
        image: "assets/authors/miranda_cowley_heller.jpg",
        bio: "Author of the bestselling debut novel 'The Paper Palace', a story of love, secrets, and memory.",
         nationality: "American",
        genre: "Contemporary Fiction",
        bookIds: [
            20
        ]
    },
    {
        id: 15,
        name: "Rebecca Yarros",
        image: "assets/authors/rebecca_yarros.jpg",
        bio: "A bestselling author of over fifteen novels, including the viral fantasy hits 'Fourth Wing' and 'Iron Flame'.",
         nationality: "American",
        genre: "Fantasy",
        bookIds: [
            21,
            25
        ]
    },
    {
        id: 16,
        name: "Sarah J. Maas",
        image: "assets/authors/sarah_j_maas.jpg",
        bio: "An American fantasy author, best known for her series 'Throne of Glass', 'A Court of Thorns and Roses', and 'Crescent City'.",
         nationality: "American",
        genre: "Fantasy",
        bookIds: [
            22
        ]
    },
    {
        id: 17,
        name: "Olivie Blake",
        image: "assets/authors/olivie_blake.jpg",
        bio: "The pen name of Alexene Farol Follmuth, a writer of fantasy and romance, known for 'The Atlas Six'.",
         nationality: "American",
        genre: "Fantasy",
        bookIds: [
            23
        ]
    },
    {
        id: 18,
        name: "R.F. Kuang",
        image: "assets/authors/rf_kuang.jpg",
        bio: "Celebrated for her fiercely intelligent fantasy novels that tackle themes of colonialism, power, and identity with historical depth.",
         nationality: "American",
        genre: "Fantasy",
        bookIds: [
            24
        ]
    },
    {
        id: 19,
        name: "Freida McFadden",
        image: "assets/authors/freida_mcfadden.jpg",
        bio: "A practicing physician and author of bestselling psychological thrillers that keep readers on the edge of their seats.",
         nationality: "American",
        genre: "Thriller",
        bookIds: [
            26
        ]
    },
    {
        id: 20,
        name: "James Clear",
        image: "assets/authors/james_clear.jpg",
        bio: "An author and speaker focused on habits, decision-making, and continuous improvement, best known for his book 'Atomic Habits'.",
         nationality: "American",
        genre: "Self-Help",
        bookIds: [
            27
        ]
    },
    {
        id: 21,
        name: "Delia Owens",
        image: "assets/authors/delia_owens.jpg",
        bio: "An American author and zoologist, she is the author of the runaway bestseller 'Where the Crawdads Sing'.",
         nationality: "American",
        genre: "Contemporary Fiction",
        bookIds: [
            28
        ]
    }
];

// Global cart helper functions
function updateCartCount() {
    const cartItemCountElement = document.getElementById('cartItemCount'); // Get it here as it's DOM dependent
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartItemCountElement) {
        cartItemCountElement.textContent = totalItems;
    }
}

function saveCart() {
    localStorage.setItem('bookVibeCart', JSON.stringify(cart));
}

function saveWishlist() {
    localStorage.setItem('bookVibeWishlist', JSON.stringify(wishlist));
}

function saveOrders() {
    localStorage.setItem('bookVibeOrders', JSON.stringify(orders));
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    toast.offsetHeight; // Trigger reflow
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 500);
    }, 3000);
}

function addToCart(book) {
    console.log("[addToCart] Function called with book:", JSON.stringify(book)); // Log the book object

    if (!book || typeof book.id === 'undefined' || typeof book.title === 'undefined' || typeof book.price === 'undefined' || typeof book.image === 'undefined') {
        console.error("[addToCart] Invalid or incomplete book object received:", book);
        showToast("Error: Could not add item. Invalid book data.", "error");
        return; // Exit if book data is invalid or incomplete
    }

    console.log("[addToCart] Looking for existing item with ID:", book.id);
    const existingItem = cart.find(item => item.id === book.id);

    if (existingItem) {
        console.log("[addToCart] Existing item found. Incrementing quantity.");
        existingItem.quantity += 1;
    } else {
        console.log("[addToCart] New item. Adding to cart with quantity 1.");
        cart.push({ ...book, quantity: 1 });
    }

    console.log("[addToCart] Calling saveCart(). Current cart state:", JSON.stringify(cart));
    saveCart();
    console.log("[addToCart] Calling updateCartCount().");
    updateCartCount(); // This will update the count in the navbar
    console.log("[addToCart] Calling showToast().");
    showToast(`${book.title} added to cart!`);
    console.log("[addToCart] Cart updated successfully. Final cart:", JSON.stringify(cart));
}

// Wishlist Helper Functions
function isBookInWishlist(bookId) {
    return wishlist.some(item => item.id === bookId);
}

function toggleWishlist(bookId, buttonElement = null) { // Added buttonElement parameter
    const book = booksData.find(b => b.id === bookId);
    if (!book) {
        console.error("[toggleWishlist] Book not found for ID:", bookId);
        showToast("Error: Book data not found.", "error");
        return;
    }

    console.log(`[toggleWishlist] Called for book ID: ${bookId}. Initial wishlist state:`, JSON.parse(JSON.stringify(wishlist)));
    const wasInWishlist = isBookInWishlist(bookId); // Check state before toggle
    const bookIndexInWishlist = wishlist.findIndex(item => item.id === bookId);
    console.log(`[toggleWishlist] Book index in wishlist: ${bookIndexInWishlist}. Was in wishlist: ${wasInWishlist}`);

    if (bookIndexInWishlist > -1) {
        wishlist.splice(bookIndexInWishlist, 1); // Remove from wishlist
        console.log(`[toggleWishlist] Removed book. Wishlist after splice:`, JSON.parse(JSON.stringify(wishlist)));
        showToast(`${book.title} removed from wishlist.`, "info");
    } else {
        wishlist.push(book); // Add to wishlist (storing the whole book object)
        console.log(`[toggleWishlist] Added book. Wishlist after push:`, JSON.parse(JSON.stringify(wishlist)));
        showToast(`${book.title} added to wishlist!`);
    }
    saveWishlist();
    updateWishlistButtons(bookId); // Update all relevant buttons on the page

    // Trigger animation on the clicked button's icon if it was just added
    if (buttonElement && !wasInWishlist && isBookInWishlist(bookId)) {
        buttonElement.classList.add('heart-pop-animation');
        // Remove the class after animation completes to allow re-triggering
        buttonElement.addEventListener('animationend', () => {
            buttonElement.classList.remove('heart-pop-animation');
        }, { once: true });
    }
}

function updateWishlistButtons(bookId) {
    // This function will update the appearance of wishlist buttons for a specific book
    // It needs to be called after toggling wishlist or when pages load
    const buttons = document.querySelectorAll(`.wishlist-btn[data-book-id="${bookId}"]`);
    console.log(`[updateWishlistButtons] Updating ${buttons.length} buttons for book ID: ${bookId}`);

    buttons.forEach(button => {
        // Ensure the button always contains the filled heart icon structure
        if (!button.querySelector('i.fas.fa-heart')) {
            button.innerHTML = '<i class="fas fa-heart"></i>';
        }

        const isInWishlist = isBookInWishlist(bookId);
        console.log(`[updateWishlistButtons] Book ID ${bookId} in wishlist: ${isInWishlist}. Button:`, button);

        if (isInWishlist) {
            console.log(`[updateWishlistButtons] Adding 'active' class to button for book ID ${bookId}`);
            button.classList.add('active');
        } else {
            console.log(`[updateWishlistButtons] Removing 'active' class from button for book ID ${bookId}`);
            button.classList.remove('active');
        }
        // CSS will handle the visibility and color of the .fas.fa-heart icon
        // based on whether the button has the .active class or is hovered.
    });
}

function displayWishlistPage() {
    const wishlistGrid = document.getElementById('wishlist-grid');
    const emptyWishlistMessage = document.getElementById('empty-wishlist-message');
    const wishlistPageTitle = document.getElementById('wishlist-page-title'); // Already in HTML

    if (!wishlistGrid || !emptyWishlistMessage || !wishlistPageTitle) {
        console.error("Required elements not found for displayWishlistPage.");
        if (wishlistGrid) wishlistGrid.innerHTML = "<p class='text-center text-danger col-12'>Could not display wishlist at this time.</p>";
        return;
    }

    // 1. Clear only previously added book cards from wishlistGrid.
    //    Give dynamically added book card columns a specific class 'wishlist-book-card-col'
    //    to target them for removal, leaving #empty-wishlist-message intact.
    const existingBookCards = wishlistGrid.querySelectorAll('.wishlist-book-card-col');
    existingBookCards.forEach(card => wishlistGrid.removeChild(card));

    const validWishlistItems = []; // To store items that are still valid and to rebuild the wishlist
    let itemsRendered = false; // Flag to check if any book cards were actually rendered

    // 2. Process current wishlist items, render valid ones, and build validWishlistItems
    wishlist.forEach(wishlistItem => {
        // Fetch the latest book details from booksData using the ID from the wishlist item
        const book = booksData.find(b => b.id === wishlistItem.id);

        if (book) { // Only proceed if the book still exists in the main booksData
            validWishlistItems.push(book); // Add the fresh book data to our list of valid items
            const bookCardCol = document.createElement('div');
            bookCardCol.className = 'col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-4 wishlist-book-card-col'; // Added specific class
            // Using a similar card structure, but with specific actions for wishlist
            bookCardCol.innerHTML = `
                <div class="book-card h-100">
                    <img src="${book.image}" alt="Cover of ${book.title}" class="card-img-top">
                    <div class="book-info">
                        <h3>${book.title}</h3>
                        <p>${book.author}</p>
                        <p class="book-price">₹${Math.round(book.price)}</p>
                        ${book.hasOwnProperty('stock') ? `<p class="book-stock">${book.stock > 0 ? `In Stock: ${book.stock}` : '<span class="text-danger">Out of Stock</span>'}</p>` : ''}
                        <div class="mt-auto">
                            <a href="book-details.html?id=${book.id}" class="btn btn-sm btn-outline-primary w-100 mb-2">View Details</a>
                            <button class="btn btn-sm btn-primary w-100 mb-2 wishlist-add-to-cart-btn" data-book-id="${book.id}">
                                <i class="fas fa-cart-plus me-1"></i> Add to Cart
                            </button>
                            <button class="btn btn-sm btn-outline-danger w-100 wishlist-remove-btn" data-book-id="${book.id}">
                                <i class="fas fa-trash-alt me-1"></i> Remove
                            </button>
                        </div>
                    </div>
                </div>
            `;
            wishlistGrid.appendChild(bookCardCol);
            itemsRendered = true;
        } else {
            console.warn(`Wishlisted book with ID ${wishlistItem.id} (title: "${wishlistItem.title}") not found in current booksData. It will be removed from the displayed wishlist.`);
        }
    });

    // 3. Update global wishlist if it was cleaned (some items were not found in booksData)
    if (validWishlistItems.length !== wishlist.length) {
        wishlist = validWishlistItems; // Update the global wishlist variable
        saveWishlist(); // Persist the cleaned wishlist
    }

    // 4. Show/hide empty message based on the *final* state of the wishlist
    if (wishlist.length === 0) {
        emptyWishlistMessage.classList.remove('d-none'); // Show the empty message
    } else {
        emptyWishlistMessage.classList.add('d-none'); // Hide the empty message
        if (itemsRendered) { // Only add listeners if cards were actually put on the page
            addWishlistPageButtonListeners();
        }
    }

    // Ensure AOS is re-initialized if items are added dynamically after initial load
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// Function to display book details on book-details.html
function displayBookDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookIdParam = urlParams.get('id');
    const bookId = parseInt(bookIdParam); // Ensure bookId is an integer

    console.log("[displayBookDetails] Called. URL:", window.location.href);
    console.log("[displayBookDetails] Extracted 'id' param:", bookIdParam, "Parsed bookId:", bookId);
    console.log("[displayBookDetails] booksData is defined:", !!booksData, "booksData length:", booksData ? booksData.length : "N/A");

    // Ensure bookId is a valid number and booksData is available and not empty
    if (bookId && !isNaN(bookId) && booksData && booksData.length > 0) {
        const book = booksData.find(b => b.id === bookId);
        console.log("Found book for details page:", book);

        if (book) {
            // Clear any previous error/fallback message
            const detailsSection = document.getElementById('book-details');
            // Check if the first child is the fallback div and remove it if so.
            if (detailsSection.firstChild && detailsSection.firstChild.classList && detailsSection.firstChild.classList.contains('text-center')) {
                // This is a basic check; more robust would be to give the fallback div an ID.
                // For now, we assume if we found a book, we should clear out the section before repopulating.
                // Or, ensure that the elements below are direct children and will overwrite.
            }
            console.log("Book Title from object:", book.title);
            console.log("Book Author from object:", book.author);
            console.log("Book Image URL from object:", book.image);
            console.log("Book Description from object:", book.description);
            console.log("Book Genre from object:", book.genre);
            console.log("Book Publication Date from object:", book.publicationDate);
            console.log("Book Price from object:", book.price);

            document.getElementById('book-image').src = book.image;
            document.getElementById('book-title').textContent = book.title;
            document.getElementById('book-author').textContent = book.author;
            document.getElementById('book-description').textContent = book.description;
            document.getElementById('book-genre').textContent = book.genre;
            document.getElementById('book-publication-date').textContent = book.publicationDate;
            document.getElementById('book-price').textContent = `₹${Math.round(book.price)}`;

            // --- New Additions for Book Details Enhancement ---
            const starRatingElement = document.getElementById('book-stars');
            if (starRatingElement) {
                // Static 4.5 stars for demonstration
                starRatingElement.innerHTML = `
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                    <span class="ms-2 text-muted">(1,234 ratings)</span> <!-- Placeholder for number of ratings -->
                `;
            }

            const stockStatusElement = document.getElementById('book-stock-status');
            if (stockStatusElement) {
                // Static "In Stock" for demonstration
                stockStatusElement.textContent = "In Stock";
                stockStatusElement.classList.add('in-stock');
            }
            // --- End New Additions ---

            const addToCartButton = document.getElementById('add-to-cart-btn');
            if (addToCartButton) {
                const newAddToCartButton = addToCartButton.cloneNode(true);
                addToCartButton.parentNode.replaceChild(newAddToCartButton, addToCartButton);
                newAddToCartButton.addEventListener('click', () => {
                    console.log("Details page 'Add to Cart' clicked. Book data:", book);
                    addToCart(book);
                });
            }

            const shopThisBookBtn = document.getElementById('details-shop-btn');
            if (shopThisBookBtn) {
                const newShopBtn = shopThisBookBtn.cloneNode(true);
                shopThisBookBtn.parentNode.replaceChild(newShopBtn, shopThisBookBtn);
                newShopBtn.addEventListener('click', () => {
                    // DO NOT add to the main cart for "Shop This Book" / "Buy Now"
                    // Instead, store the whole book object (with quantity 1) for the buy now flow
                    sessionStorage.setItem('bookVibeBuyNowItem', JSON.stringify({ ...book, quantity: 1 }));
                    window.location.href = 'checkout.html?buyNow=true'; // Redirect with a flag
                });
            } else {
                console.warn("[displayBookDetails] 'details-shop-btn' not found.");
            }

            // Re-add logic for the "More in [Genre]" button
            const moreInGenreLinkBtn = document.getElementById('details-more-in-genre-link');
            if (moreInGenreLinkBtn && book.genre) {
                moreInGenreLinkBtn.href = `genre-books.html?genre=${encodeURIComponent(book.genre)}`;
                moreInGenreLinkBtn.innerHTML = `<i class="fas fa-search me-2"></i>More in ${book.genre}`; // Update text dynamically
                console.log(`[displayBookDetails] Set 'More in ${book.genre}' button link to: ${moreInGenreLinkBtn.href}`);
            } else if (moreInGenreLinkBtn) {
                moreInGenreLinkBtn.style.display = 'none'; // Hide if no genre
            }

            const wishlistButton = document.getElementById('details-wishlist-btn');
            if (wishlistButton) {
                wishlistButton.dataset.bookId = book.id; // Set book ID for the button
                // updateWishlistButtons(book.id); // Initial state handled by initializeAllWishlistButtonStates
                // Clone and replace to remove old listeners, then add new one
                const newWishlistButton = wishlistButton.cloneNode(true); // Clone to ensure fresh listeners
                wishlistButton.parentNode.replaceChild(newWishlistButton, wishlistButton);

                // Define a single, clear event handler for the click
                const detailsPageWishlistClickHandler = function (event) {
                    event.preventDefault();
                    // event.stopPropagation(); // Optional: if needed to stop event bubbling

                    const currentBookId = parseInt(this.dataset.bookId); // Re-fetch bookId from 'this'
                    console.log(`Details page wishlist button clicked for book ID: ${currentBookId}. Button element:`, this);
                    toggleWishlist(currentBookId, this); // 'this' is the button element
                };

                newWishlistButton.addEventListener('click', detailsPageWishlistClickHandler);
            }
        } else {
            console.error(`Book with ID ${bookId} not found in booksData.`);
            const detailsSection = document.getElementById('book-details');
            if (detailsSection) {
                detailsSection.innerHTML = '<p class="text-center text-danger">Book not found.</p>';
            }
        }
    } else {
        console.error('[displayBookDetails] Failed to meet conditions for displaying book details.');
        console.error(`[displayBookDetails] Details: bookId=${bookId} (is NaN: ${isNaN(bookId)}), booksData defined: ${!!booksData}, booksData length: ${booksData ? booksData.length : 'N/A'}`);

        const detailsSection = document.getElementById('book-details');
        if (detailsSection) {
            detailsSection.innerHTML = `
                <div class="text-center py-5">
                    <h2>No Book Selected</h2>
                    <p class="lead">It looks like you've landed here without choosing a specific book.</p>
                    <p>Please select a book from our <a href="index.html" class="btn btn-primary">Homepage</a> to see its details, or ensure you have an <code>?id=X</code> parameter in the URL if you're testing.</p>
                </div>`;
        }
    }
}

// Function to display genres on genres.html
function displayGenres() {
    const genreGrid = document.getElementById('genre-grid');
    if (!genreGrid || !booksData) {
        console.error("Genre grid element or booksData not found for displayGenres.");
        if (genreGrid) genreGrid.innerHTML = "<p class='text-center text-danger col-12'>Could not load genres at this time.</p>";
        return;
    }

    const genreIcons = {
        "Contemporary Fiction": "fas fa-book-open-reader",
        "Self-Help": "fas fa-hands-helping",
        "Mystery": "fas fa-user-secret",
        "Thriller": "fas fa-bolt",
        "Science Fiction": "fas fa-rocket",
        "Romance": "fas fa-heart",
        "Historical Fiction": "fas fa-landmark",
        "Fantasy": "fas fa-dragon",
        "Adventure": "fas fa-map-signs", // New icon for Adventure
        "Humor": "fas fa-smile-beam",    // New icon for Humor
        "Historical Non-Fiction": "fas fa-scroll", // New icon for Historical Non-Fiction
        "Default": "fas fa-book"
    };

    const uniqueGenres = [...new Set(booksData.map(book => book.genre))].sort();

    if (uniqueGenres.length === 0) {
        genreGrid.innerHTML = "<p class='text-center text-muted col-12'>No genres available at the moment.</p>";
        return;
    }

    genreGrid.innerHTML = '';
    uniqueGenres.forEach(genre => {
        const genreCardCol = document.createElement('div');
        genreCardCol.className = 'col';
        const iconClass = genreIcons[genre] || genreIcons["Default"];
        genreCardCol.innerHTML = `
            <a href="genre-books.html?genre=${encodeURIComponent(genre)}" class="text-decoration-none">
                <div class="genre-card-item card h-100 text-center">
                    <div class="card-body d-flex flex-column justify-content-center align-items-center p-3">
                        <i class="${iconClass} fa-2x mb-3"></i>
                        <h5 class="card-title mb-0">${genre}</h5>
                    </div>
                </div>
            </a>
        `;
        genreGrid.appendChild(genreCardCol);
    });
}

// Function to display books for a specific genre on genre-books.html
function displayGenreSpecificBooks() {
    const urlParams = new URLSearchParams(window.location.search);
    const genreName = urlParams.get('genre');
    const genreBooksGrid = document.getElementById('genre-books-grid');
    const genrePageTitleElement = document.getElementById('genre-page-title');

    if (!genreName || !genreBooksGrid || !genrePageTitleElement) {
        console.error("Required elements or genre name not found for displayGenreSpecificBooks.");
        if (genreBooksGrid) genreBooksGrid.innerHTML = "<p class='text-center text-danger col-12'>Could not load books for this genre.</p>";
        if (genrePageTitleElement) genrePageTitleElement.textContent = "Genre Not Found";
        document.title = "Genre Not Found - BookVibe";
        return;
    }

    const formattedGenreName = decodeURIComponent(genreName);
    let displayGenreName = formattedGenreName;
    const lowerGenreName = formattedGenreName.toLowerCase();

    if (!lowerGenreName.includes("fiction") && !lowerGenreName.includes("genre")) {
        displayGenreName += " Genre";
    }

    genrePageTitleElement.innerHTML = `Books in <span class="highlight-text">${displayGenreName}</span>`;
    document.title = `${displayGenreName} Books - BookVibe`;

    const booksInGenre = booksData.filter(book => book.genre.toLowerCase() === formattedGenreName.toLowerCase());

    genreBooksGrid.innerHTML = '';

    if (booksInGenre.length === 0) {
        genreBooksGrid.innerHTML = `<p class="text-center text-muted col-12">No books found in the "${formattedGenreName}" genre yet. Check back soon!</p>`;
        return;
    }

    booksInGenre.forEach(book => {
        const bookCardCol = document.createElement('div');
        bookCardCol.className = 'col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-4';
        bookCardCol.innerHTML = `
            <div class="book-card h-100">
                <img src="${book.image}" alt="Cover of ${book.title}" class="card-img-top">
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <p class="book-price">₹${Math.round(book.price)}</p>
                    <div class="d-flex justify-content-between align-items-center mt-auto">
                        <a href="book-details.html?id=${book.id}" class="btn btn-primary">Explore <i class="fas fa-arrow-right ms-1"></i></a>
                        <button class="btn wishlist-btn wishlist-btn-card" data-book-id="${book.id}" title="Add to Wishlist">
                            <i class="fas fa-heart"></i> <!-- Always fas fa-heart -->
                        </button>
                    </div>
                </div>
            </div>
        `;
        genreBooksGrid.appendChild(bookCardCol);
    });
    // Add event listeners to newly created wishlist buttons on cards
    addWishlistButtonListeners(genreBooksGrid);
}

// Function to display books for a specific mood on mood-books.html
function displayMoodSpecificBooks() {
    const urlParams = new URLSearchParams(window.location.search);
    const moodName = urlParams.get('mood');
    const moodBooksGrid = document.getElementById('mood-books-grid');
    const moodPageTitleElement = document.getElementById('mood-page-title');

    if (!moodName || !moodBooksGrid || !moodPageTitleElement) {
        console.error("Required elements or mood name not found for displayMoodSpecificBooks.");
        if (moodBooksGrid) moodBooksGrid.innerHTML = "<p class='text-center text-danger col-12'>Could not load books for this mood.</p>";
        if (moodPageTitleElement) moodPageTitleElement.textContent = "Mood Not Found";
        document.title = "Mood Not Found - BookVibe";
        return;
    }

    const formattedMoodName = decodeURIComponent(moodName);
    let article = "a";
    const firstLetter = formattedMoodName.charAt(0).toLowerCase();
    if (['a', 'e', 'i', 'o', 'u'].includes(firstLetter)) {
        article = "an";
    }

    moodPageTitleElement.innerHTML = `Books for ${article} <span class="highlight-text">${formattedMoodName}</span> Vibe`;
    document.title = `Books for ${article} ${formattedMoodName} Vibe - BookVibe`;

    const booksForMood = booksData.filter(book =>
        book.moods && book.moods.some(m => m.toLowerCase() === formattedMoodName.toLowerCase())
    );

    moodBooksGrid.innerHTML = '';

    if (booksForMood.length === 0) {
        moodBooksGrid.innerHTML = `<p class="text-center text-muted col-12">No books found for the "${formattedMoodName}" vibe yet. Explore other moods!</p>`;
        return;
    }

    booksForMood.forEach(book => {
        const bookCardCol = document.createElement('div');
        bookCardCol.className = 'col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-4';
        bookCardCol.innerHTML = `
            <div class="book-card h-100">
                <img src="${book.image}" alt="Cover of ${book.title}" class="card-img-top">
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <p class="book-price">₹${Math.round(book.price)}</p>
                    <div class="d-flex justify-content-between align-items-center mt-auto">
                        <a href="book-details.html?id=${book.id}" class="btn btn-primary">Explore <i class="fas fa-arrow-right ms-1"></i></a>
                        <button class="btn wishlist-btn wishlist-btn-card" data-book-id="${book.id}" title="Add to Wishlist">
                            <i class="fas fa-heart"></i> <!-- Always fas fa-heart -->
                        </button>
                    </div>
                </div>
            </div>
        `;
        moodBooksGrid.appendChild(bookCardCol);
    });
    // Add event listeners to newly created wishlist buttons on cards
    addWishlistButtonListeners(moodBooksGrid);
}

// Function to display search results on search-results.html
function displaySearchResultsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('query');
    const searchResultsGrid = document.getElementById('search-results-grid');
    const searchPageTitleElement = document.getElementById('search-page-title');

    if (!searchResultsGrid || !searchPageTitleElement) { // searchQuery can be null/empty, handled below
        console.error("Required DOM elements not found for displaySearchResultsPage.");
        if (searchResultsGrid) searchResultsGrid.innerHTML = "<p class='text-center text-danger col-12'>Could not display search results due to a page error.</p>";
        if (searchPageTitleElement) searchPageTitleElement.textContent = "Search Error";
        document.title = "Search Error - BookVibe";
        return;
    }

    const formattedQuery = searchQuery ? decodeURIComponent(searchQuery).trim() : "";

    if (!formattedQuery) {
        searchPageTitleElement.textContent = "Search BookVibe";
        document.title = "Search - BookVibe";
        searchResultsGrid.innerHTML = `<p class="text-center text-muted col-12">Please enter a keyword or phrase to search for books.</p>`;
        return;
    }

    searchPageTitleElement.innerHTML = `Search Results for "<span class="highlight-text">${formattedQuery}</span>"`;
    document.title = `Search Results for "${formattedQuery}" - BookVibe`;

    const searchWords = formattedQuery.toLowerCase().split(' ').filter(word => word.length > 0);

    const results = booksData.filter(book => {
        const titleLower = book.title.toLowerCase();
        const authorLower = book.author.toLowerCase();

        // Check if all search words are in the title OR all search words are in the author
        const titleMatches = searchWords.every(word => titleLower.includes(word)); 
        const authorMatches = searchWords.every(word => authorLower.includes(word));

        return titleMatches || authorMatches;
    });

    searchResultsGrid.innerHTML = ''; // Clear placeholders

    if (results.length === 0) {
        searchResultsGrid.innerHTML = `<p class="text-center text-muted col-12">No books found matching your search for "<span class="fw-bold">${formattedQuery}</span>". Try a different term!</p>`;
        return;
    }

    results.forEach(book => {
        const bookCardCol = document.createElement('div');
        bookCardCol.className = 'col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-4';
        bookCardCol.innerHTML = `
            <div class="book-card h-100">
                <img src="${book.image}" alt="Cover of ${book.title}" class="card-img-top">
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <p class="book-price">₹${Math.round(book.price)}</p>
                    <div class="d-flex justify-content-between align-items-center mt-auto">
                        <a href="book-details.html?id=${book.id}" class="btn btn-primary">Explore <i class="fas fa-arrow-right ms-1"></i></a>
                        <button class="btn wishlist-btn wishlist-btn-card" data-book-id="${book.id}" title="Add to Wishlist">
                            <i class="fas fa-heart"></i> <!-- Always fas fa-heart -->
                        </button>
                    </div>
                </div>
            </div>
        `;
        searchResultsGrid.appendChild(bookCardCol);
    });
    // Add event listeners to newly created wishlist buttons on cards
    addWishlistButtonListeners(searchResultsGrid);
}

// Function to populate featured books, potentially filtered by genre
function populateFeaturedBooks(filterGenre = null, searchQuery = null) {
    const featuredBooksSection = document.getElementById('featured-books');
    const carouselElement = document.getElementById('featuredBooksCarousel');
    const carouselInner = carouselElement ? carouselElement.querySelector('.carousel-inner') : null;
    const sectionTitleElement = featuredBooksSection ? featuredBooksSection.querySelector('h2') : null;

    let booksToDisplay = booksData;
    let sectionTitle = "Bestsellers & Trending Now";

    if (!featuredBooksSection) return;

    // This function is primarily for the homepage carousel.
    // Search results are now handled by search-results.html.
    // Genre specific pages are handled by genre-books.html.
    // We keep the searchQuery logic here in case someone manually navigates to index.html?search=...
    // but the main search form redirects to search-results.html.

    if (searchQuery) {
        // If a search query is present (e.g., from a direct URL like index.html?search=query),
        // filter the books and display them as a grid, hiding the carousel.
        booksToDisplay = booksData.filter(book => // Filter from all booksData
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (sectionTitleElement) {
            sectionTitle = `Search Results for "${searchQuery}"`;
        }
    } else if (filterGenre) {
        // This case is less likely now with dedicated genre pages, but kept for robustness
        booksToDisplay = booksData.filter(book => book.genre.toLowerCase() === filterGenre.toLowerCase());
        if (sectionTitleElement) {
            sectionTitle = `Books in "${filterGenre}"`;
        }
    }


    if (sectionTitleElement) {
        sectionTitleElement.textContent = sectionTitle;
    }

    // If it's a search result (from direct URL) or a genre filter (legacy), display as grid.
    if (searchQuery || filterGenre) {
        let gridHTML = '<div class="row justify-content-center">';
        if (booksToDisplay.length === 0) {
            let message = "No books found.";
            if (searchQuery) message = `No books found for your search: "${searchQuery}".`;
            else if (filterGenre) message = `No books found for "${filterGenre}".`;
            gridHTML = `<p class="text-center text-muted col-12">${message}</p>`;
        } else {
            booksToDisplay.forEach(book => {
                gridHTML += `
                    <div class="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-4">
                        <div class="book-card h-100">
                            <img src="${book.image}" alt="Cover of ${book.title}" class="card-img-top">
                            <div class="book-info">
                                <h3>${book.title}</h3>
                                <p>${book.author}</p>
                                <p class="book-price">₹${Math.round(book.price)}</p>
                                <div class="d-flex justify-content-between align-items-center mt-auto">
                                    <a href="book-details.html?id=${book.id}" class="btn btn-primary">Explore <i class="fas fa-arrow-right ms-1"></i></a>
                                    <button class="btn wishlist-btn wishlist-btn-card" data-book-id="${book.id}" title="Add to Wishlist">
                                        <i class="fas fa-heart"></i> <!-- Always fas fa-heart -->
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        gridHTML += '</div>';

        if (carouselElement) carouselElement.style.display = 'none';

        let gridContainer = featuredBooksSection.querySelector('.books-grid-container');
        if (!gridContainer) {
            gridContainer = document.createElement('div');
            gridContainer.className = 'container books-grid-container pt-3';
            if (sectionTitleElement && sectionTitleElement.nextSibling) {
                sectionTitleElement.parentNode.insertBefore(gridContainer, sectionTitleElement.nextSibling);
            } else if (sectionTitleElement) {
                sectionTitleElement.parentNode.appendChild(gridContainer);
            } else {
                featuredBooksSection.prepend(gridContainer);
            }
        }
        gridContainer.innerHTML = gridHTML;
        // Add event listeners to newly created wishlist buttons on cards
        addWishlistButtonListeners(gridContainer);
        return; // Exit after displaying grid for search/filter
    }

    // Default: Populate original carousel structure if no filter and carousel exists
    if (carouselElement && carouselInner) {
        carouselElement.style.display = 'block'; // Ensure carousel is visible
        let gridContainer = featuredBooksSection.querySelector('.books-grid-container');
        if (gridContainer) gridContainer.innerHTML = ''; // Clear any existing grid

        carouselInner.innerHTML = ''; // Clear previous items

        const booksPerSlide = 6; // Increased from 4 to 6
        for (let i = 0; i < booksToDisplay.length; i += booksPerSlide) {
            const slideBooks = booksToDisplay.slice(i, i + booksPerSlide);
            const carouselItemDiv = document.createElement('div');
            carouselItemDiv.className = 'carousel-item' + (i === 0 ? ' active' : '');

            // Each slide's content is wrapped in a container for proper alignment and padding
            let rowHTML = '<div class="container"><div class="row justify-content-center">';
            slideBooks.forEach((book, index) => {
                // Adjusted column classes for better responsiveness with 6 items per slide
                const colClasses = "col-12 col-sm-6 col-md-3 col-lg-2 mb-4";
                const aosDelay = index * 100; // Staggered delay for animation
                rowHTML += `
                    <div class="${colClasses}" data-aos="fade-up" data-aos-delay="${aosDelay}">
                        <div class="book-card h-100">
                            <img src="${book.image}" alt="Cover of ${book.title}" class="card-img-top">
                            <div class="book-info">
                                <h3>${book.title}</h3>
                                <p>${book.author}</p>
                                <p class="book-price">₹${Math.round(book.price)}</p>
                                <div class="d-flex justify-content-between align-items-center mt-auto">
                                    <a href="book-details.html?id=${book.id}" class="btn btn-primary">Explore <i class="fas fa-arrow-right ms-1"></i></a>
                                    <button class="btn wishlist-btn wishlist-btn-card" data-book-id="${book.id}" title="Add to Wishlist">
                                        <i class="fas fa-heart"></i> <!-- Always fas fa-heart -->
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            rowHTML += '</div></div>'; // Close row and container
            carouselItemDiv.innerHTML = rowHTML;
            carouselInner.appendChild(carouselItemDiv);
        }

        const prevButton = carouselElement.querySelector('.carousel-control-prev');
        const nextButton = carouselElement.querySelector('.carousel-control-next');
        if (booksToDisplay.length <= booksPerSlide) {
            if (prevButton) prevButton.style.display = 'none';
            if (nextButton) nextButton.style.display = 'none';
        } else {
            if (prevButton) prevButton.style.display = 'block';
            if (nextButton) nextButton.style.display = 'block';
        }
    } else if (carouselElement) {
        // Fallback if carouselInner is not found but carouselElement is
        carouselElement.innerHTML = "<p class='text-center text-muted col-12'>Could not load featured books carousel.</p>";
    }
    // Add event listeners to newly created wishlist buttons on cards (for carousel)
    if (carouselInner) {
        addWishlistButtonListeners(carouselInner);
    }
}


// Helper function to add event listeners for buttons on the wishlist page
function addWishlistPageButtonListeners() {
    const removeButtons = document.querySelectorAll('.wishlist-remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const bookId = parseInt(this.dataset.bookId);
            toggleWishlist(bookId, this); // Pass buttonElement. Animation only triggers on add.
            displayWishlistPage(); // Re-render the wishlist page
        });
    });

    const addToCartButtons = document.querySelectorAll('.wishlist-add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const bookId = parseInt(this.dataset.bookId);
            const book = booksData.find(b => b.id === bookId);
            if (book) addToCart(book);
        });
    });
}
// --- Profile Page Functionality ---

const defaultUserProfile = {
    name: "Vibing Reader",
    email: "reader@bookvibe.com",
    bio: "A book lover on a quest for the next great read.",
    address: "", // Optional: Add to HTML if needed
    profilePictureUrl: "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png" // Generic user avatar // Default placeholder
};

function getUserProfile() {
    const profile = JSON.parse(localStorage.getItem('bookVibeUserProfile'));
    // Merge with defaults to ensure all fields are present if profile was saved with fewer fields
    return profile ? { ...defaultUserProfile, ...profile } : { ...defaultUserProfile };
}

function saveUserProfile(profileData) {
    localStorage.setItem('bookVibeUserProfile', JSON.stringify(profileData));
}

function displayUserProfile() {
    const profile = getUserProfile();

    // Sidebar display elements
    const profilePageNameDisplay = document.getElementById('profilePageName');
    const profilePageEmailDisplay = document.getElementById('profilePageEmail');
    const profilePagePicDisplay = document.getElementById('profilePagePic');

    // Form input elements
    const profileNameInput = document.getElementById('profileNameInput');
    const profileEmailInput = document.getElementById('profileEmailInput');
    const profileBioInput = document.getElementById('profileBioInput');
    // const profileAddressInput = document.getElementById('profileAddressInput'); // If you add an address field

    if (profilePageNameDisplay) profilePageNameDisplay.textContent = profile.name;
    if (profilePageEmailDisplay) profilePageEmailDisplay.textContent = profile.email;
    if (profilePagePicDisplay) profilePagePicDisplay.src = profile.profilePictureUrl;

    if (profileNameInput) profileNameInput.value = profile.name;
    if (profileEmailInput) profileEmailInput.value = profile.email;
    if (profileBioInput) profileBioInput.value = profile.bio;
    // if (profileAddressInput) profileAddressInput.value = profile.address;

    // Optional: Update username in navbar if an element with id="navbarUsername" exists
    const navbarUsername = document.getElementById('navbarUsername');
    if (navbarUsername) {
        navbarUsername.textContent = profile.name;
    }
}

function handleProfileFormSubmit(event) {
    event.preventDefault();
    const saveButton = event.target.querySelector('button[type="submit"]');
    const btnText = saveButton ? saveButton.querySelector('.btn-text') : null;
    const spinnerIcon = saveButton ? saveButton.querySelector('.fa-spinner') : null;
    const tickIcon = saveButton ? saveButton.querySelector('.fa-check-circle') : null;

    if (btnText) btnText.textContent = 'Saving...';
    if (spinnerIcon) spinnerIcon.classList.remove('d-none');
    if (tickIcon) tickIcon.classList.add('d-none');
    if (saveButton) saveButton.disabled = true;

    // Simulate async operation
    setTimeout(() => {
        const currentProfile = getUserProfile(); // Get current profile to preserve picture if not changed
        const newProfileData = {
            ...currentProfile, // Preserve existing data like profilePictureUrl
            name: document.getElementById('profileNameInput').value,
            email: document.getElementById('profileEmailInput').value,
            bio: document.getElementById('profileBioInput').value,
            // address: document.getElementById('profileAddressInput') ? document.getElementById('profileAddressInput').value : currentProfile.address,
        };

        saveUserProfile(newProfileData);
        displayUserProfile(); // Refresh displayed data

        if (btnText) btnText.textContent = 'Save Changes';
        if (spinnerIcon) spinnerIcon.classList.add('d-none');
        if (tickIcon) tickIcon.classList.remove('d-none');
        if (saveButton) saveButton.disabled = false;

        showToast("Profile updated successfully!", "success"); // Re-use existing toast

        // Hide tick icon after a short delay
        setTimeout(() => {
            if (tickIcon) tickIcon.classList.add('d-none');
        }, 2000);

    }, 1000); // Simulate network delay
}

function handleProfilePictureChange(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const profilePagePicDisplay = document.getElementById('profilePagePic');
            if (profilePagePicDisplay) {
                profilePagePicDisplay.src = e.target.result;
            }
            // Save the new picture to profile
            const profile = getUserProfile();
            profile.profilePictureUrl = e.target.result; // Store as Base64
            saveUserProfile(profile);
            showToast("Profile picture updated!", "success");
        }
        reader.readAsDataURL(file);
    }
}

function handleLogout() {
    // Basic logout: clear local storage and redirect to home.
    // In a real app, this would involve backend calls to invalidate sessions.
    localStorage.removeItem('bookVibeUserProfile'); // Clear profile
    // Potentially clear cart, wishlist etc. if user session is fully ended
    // localStorage.removeItem('bookVibeCart');
    // localStorage.removeItem('bookVibeWishlist');
    showToast("You have been logged out.", "info");
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

function handleSettingsFormSubmit(event) {
    event.preventDefault();
    const saveButton = event.target.querySelector('button[type="submit"]');
    const btnText = saveButton ? saveButton.querySelector('.btn-text') : null;
    const spinnerIcon = saveButton ? saveButton.querySelector('.fa-spinner') : null;
    const tickIcon = saveButton ? saveButton.querySelector('.fa-check-circle') : null;

    if (!saveButton || !btnText || !spinnerIcon || !tickIcon) {
        console.error("Could not find all required elements on the settings save button.");
        return;
    }

    btnText.textContent = 'Saving...';
    spinnerIcon.classList.remove('d-none');
    tickIcon.classList.add('d-none');
    saveButton.disabled = true;

    // Simulate async operation
    setTimeout(() => {
        // In a real app, you would collect and save the settings data here.
        btnText.textContent = 'Save Settings';
        spinnerIcon.classList.add('d-none');
        tickIcon.classList.remove('d-none');
        saveButton.disabled = false;

        showToast("Settings saved successfully!", "success");

        // Hide tick icon after a short delay
        setTimeout(() => {
            tickIcon.classList.add('d-none');
        }, 2000);
    }, 1500); // Simulate a slightly longer network delay
}

function animateVibeStats() {
    const statsContainer = document.getElementById('my-vibes');
    if (!statsContainer) {
        console.warn("Vibe Stats container not found for animation.");
        return;
    }

    // --- LOGIC CORRECTION ---
    // Dynamically set the target for wishlisted items based on the actual wishlist length.
    const wishlistStatCounter = document.getElementById('wishlistStatValue');
    if (wishlistStatCounter) {
        // The global 'wishlist' variable is defined at the top of script.js
        wishlistStatCounter.dataset.target = wishlist.length;
    }
    // --- END LOGIC CORRECTION ---

    const counters = statsContainer.querySelectorAll('.stat-value[data-target]');
    const animationDuration = 1500; // Total duration in ms

    counters.forEach(counter => {
        // Prevent re-animating if it's already running.
        if (counter.isAnimating) return;
        counter.isAnimating = true;

        counter.innerText = '0'; // Reset before animation
        const target = +counter.dataset.target;
        if (isNaN(target)) {
            counter.isAnimating = false;
            return; // Skip if target is not a number
        }

        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / animationDuration, 1);
            const currentValue = Math.floor(progress * target);
            counter.innerText = currentValue;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                counter.innerText = target; // Ensure it ends on the exact target value
                counter.isAnimating = false; // Animation finished
            }
        };
        window.requestAnimationFrame(step);
    });
}
// --- End Profile Page Functionality ---


// --- Cart Page Functionality ---
function displayCartPage() {
    const cartContent = document.getElementById('cart-content');
    const emptyCartMessage = document.getElementById('empty-cart-message');

    if (!cartContent || !emptyCartMessage) {
        return; // Not on the cart page
    }

    if (cart.length === 0) {
        cartContent.innerHTML = ''; // Clear any existing content
        cartContent.classList.add('d-none');
        emptyCartMessage.classList.remove('d-none');
    } else {
        emptyCartMessage.classList.add('d-none');
        cartContent.classList.remove('d-none');

        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });

        cartContent.innerHTML = `
            <div class="row">
                <!-- Cart Items List -->
                <div class="col-lg-8 mb-4 mb-lg-0">
                    <div class="card shadow-sm cart-items-card">
                        <div class="card-header bg-white py-3">
                            <h5 class="mb-0">Cart Items (${cart.reduce((sum, item) => sum + item.quantity, 0)})</h5>
                        </div>
                        <div class="card-body p-0">
                            <ul class="list-group list-group-flush">
                                ${cart.map(item => `
                                    <li class="list-group-item px-3 py-3">
                                        <div class="row align-items-center">
                                            <div class="col-2 col-md-2">
                                                <a href="book-details.html?id=${item.id}">
                                                    <img src="${item.image}" alt="${item.title}" class="img-fluid rounded cart-page-item-img">
                                                </a>
                                            </div>
                                            <div class="col-5 col-md-5">
                                                <a href="book-details.html?id=${item.id}" class="text-dark fw-bold text-decoration-none cart-item-title-link">${item.title}</a>
                                                <p class="text-muted small mb-0">by ${item.author}</p>
                                                <p class="text-primary-cyan small mb-0">₹${Math.round(item.price)}</p>
                                            </div>
                                            <div class="col-3 col-md-3">
                                                <div class="input-group input-group-sm cart-quantity-controls">
                                                    <button class="btn btn-outline-secondary decrease-quantity-btn" type="button" data-book-id="${item.id}"><i class="fas fa-minus"></i></button>
                                                    <input type="text" class="form-control text-center cart-item-quantity" value="${item.quantity}" readonly>
                                                    <button class="btn btn-outline-secondary increase-quantity-btn" type="button" data-book-id="${item.id}"><i class="fas fa-plus"></i></button>
                                                </div>
                                            </div>
                                            <div class="col-2 col-md-2 text-end">
                                                <span class="fw-bold d-block mb-2">₹${Math.round(item.price * item.quantity)}</span>
                                                <a href="#" class="remove-from-cart-link text-danger" data-book-id="${item.id}" title="Remove item"><i class="fas fa-trash"></i></a>
                                            </div>
                                        </div>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Order Summary -->
                <div class="col-lg-4">
                    <div class="card shadow-sm summary-card">
                        <div class="card-header bg-white py-3">
                            <h5 class="mb-0">Order Summary</h5>
                        </div>
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Subtotal
                                    <span>₹${Math.round(subtotal)}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Shipping
                                    <span class="text-success">FREE</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center fw-bold px-0 border-top pt-3 mt-2">
                                    Total
                                    <span>₹${Math.round(subtotal)}</span>
                                </li>
                            </ul>
                            <a href="checkout.html" class="btn btn-primary w-100 mt-4">Proceed to Checkout</a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners after rendering
        addCartPageEventListeners();
    }
}

function addCartPageEventListeners() {
    document.querySelectorAll('.increase-quantity-btn').forEach(button => {
        button.addEventListener('click', function () {
            const bookId = parseInt(this.dataset.bookId);
            const item = cart.find(i => i.id === bookId);
            if (item) {
                item.quantity++;
                saveCart();
                updateCartCount();
                displayCartPage();
            }
        });
    });

    document.querySelectorAll('.decrease-quantity-btn').forEach(button => {
        button.addEventListener('click', function () {
            const bookId = parseInt(this.dataset.bookId);
            const item = cart.find(i => i.id === bookId);
            if (item && item.quantity > 1) {
                item.quantity--;
                saveCart();
                updateCartCount();
                displayCartPage();
            } else if (item && item.quantity === 1) {
                // If quantity is 1, decreasing should remove it. Confirm first.
                if (confirm(`Remove "${item.title}" from your cart?`)) {
                    cart = cart.filter(i => i.id !== bookId);
                    saveCart();
                    updateCartCount();
                    displayCartPage();
                    showToast(`${item.title} removed from cart.`, 'info');
                }
            }
        });
    });

    document.querySelectorAll('.remove-from-cart-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const bookId = parseInt(this.dataset.bookId);
            const item = cart.find(i => i.id === bookId);
            if (item) {
                if (confirm(`Are you sure you want to remove "${item.title}" from your cart?`)) {
                    cart = cart.filter(i => i.id !== bookId);
                    saveCart();
                    updateCartCount();
                    displayCartPage();
                    showToast(`${item.title} removed from cart.`, 'info');
                }
            }
        });
    });
}

// --- Order History Functionality ---
function displayOrderHistory() {
    const accordionContainer = document.getElementById('orderHistoryAccordion');
}
// --- Order History Functionality ---
function displayOrderHistory() {
    const accordionContainer = document.getElementById('orderHistoryAccordion');
    const noOrdersMessage = document.getElementById('no-orders-message');

    if (!accordionContainer || !noOrdersMessage) {
        // This might run on pages other than profile.html, so no error needed if elements aren't there.
        return;
    }

    // `orders` is the global variable loaded from localStorage
    if (orders && orders.length > 0) {
        noOrdersMessage.classList.add('d-none');
        accordionContainer.classList.remove('d-none');
        accordionContainer.innerHTML = ''; // Clear previous content

        orders.forEach((order, index) => {
            const orderDate = new Date(order.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });
            const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

            const accordionItem = document.createElement('div');
            accordionItem.className = 'accordion-item mb-3 shadow-sm'; // Added shadow for depth
            accordionItem.innerHTML = `
                <h2 class="accordion-header" id="heading-${order.id}">
                    <button class="accordion-button ${index > 0 ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${order.id}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="collapse-${order.id}">
                        <div class="d-flex flex-wrap justify-content-between w-100 pe-3 gap-2">
                            <span class="order-header-item"><strong>Order ID:</strong> ${order.id}</span>
                            <span class="order-header-item"><strong>Date:</strong> ${orderDate}</span>
                            <span class="order-header-item"><strong>Total:</strong> ₹${Math.round(order.total)}</span>
                        </div>
                    </button>
                </h2>
                <div id="collapse-${order.id}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="heading-${order.id}" data-bs-parent="#orderHistoryAccordion">
                    <div class="accordion-body">
                        <h6 class="mb-3">Order Details (${totalItems} ${totalItems > 1 ? 'items' : 'item'})</h6>
                        <ul class="list-group list-group-flush">
                            ${order.items.map(item => `
                                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <div class="me-3 mb-2 mb-md-0">
                                        <a href="book-details.html?id=${item.id}" class="text-dark fw-bold text-decoration-none order-item-title">${item.title}</a>
                                        <small class="d-block text-muted">by ${item.author}</small>
                                    </div>
                                    <div class="d-flex gap-3">
                                        <span>Qty: ${item.quantity}</span>
                                        <span class="fw-bold">₹${Math.round(item.price * item.quantity)}</span>
                                    </div>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            `;
            accordionContainer.appendChild(accordionItem);
        });
    } else {
        // No orders found
        noOrdersMessage.classList.remove('d-none');
        accordionContainer.classList.add('d-none');
        accordionContainer.innerHTML = '';
    }
}

// --- Vibe of the Week (Spotlight) Functionality ---
function populateVibeSpotlight() {
    // A curated list of book IDs for the spotlight. More can be added.
    const spotlightBookCandidates = [19, 21, 3, 24, 17, 22, 6, 13, 14, 18, 5, 7, 2, 4, 11, 12, 15, 16, 20, 23]; // Expanded list for more variety

    // Helper function to get the day number of the year (1-366)
    function getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
        const oneDay = 1000 * 60 * 60 * 24;
        const day = Math.floor(diff / oneDay);
        return day;
    }

    const currentDayOfYear = getDayOfYear(new Date());
    // Use modulo to cycle through the candidate list, ensuring it never goes out of bounds
    const spotlightBookId = spotlightBookCandidates[currentDayOfYear % spotlightBookCandidates.length];

    const spotlightBook = booksData.find(book => book.id === spotlightBookId);

    const titleElement = document.getElementById('spotlight-title');
    const descriptionElement = document.getElementById('spotlight-description');
    const imageElement = document.getElementById('spotlight-image');
    const shopButtonElement = document.getElementById('spotlightShopBtn');

    if (spotlightBook && titleElement && descriptionElement && imageElement && shopButtonElement) {
        // Make title a link to the details page
        titleElement.innerHTML = `<a href="book-details.html?id=${spotlightBook.id}" class="text-white text-decoration-none">${spotlightBook.title}</a>`;

        // The description from booksData can be long. For the spotlight, we'll just show the first line.
        descriptionElement.textContent = spotlightBook.description.split('\n')[0]; // Displaying only the first line/paragraph for brevity

        imageElement.src = spotlightBook.image;
        imageElement.alt = `Cover of ${spotlightBook.title}`;

        // Wrap image in a link to make it clickable
        const imageContainer = imageElement.parentElement;
        if (imageContainer && imageContainer.tagName !== 'A') { // Prevent double-wrapping if run again
            const link = document.createElement('a');
            link.href = `book-details.html?id=${spotlightBook.id}`;
            imageContainer.insertBefore(link, imageElement);
            link.appendChild(imageElement);
        } else if (imageContainer && imageContainer.tagName === 'A') { // If already wrapped, just update href
            imageContainer.href = `book-details.html?id=${spotlightBook.id}`;
        }

        shopButtonElement.dataset.bookId = spotlightBook.id;
        // The existing event listener for the shop button will now use the correct dynamic ID.
    } else {
        console.warn("Could not populate Vibe Spotlight. Book or DOM elements missing.");
        // Optionally hide the section or show a fallback if elements are missing
        const vibeSpotlightSection = document.querySelector('.vibe-spotlight');
        if (vibeSpotlightSection) vibeSpotlightSection.style.display = 'none';
    }
}

// --- Featured Author Functionality ---
function populateFeaturedAuthor() {
    const authorSection = document.getElementById('featured-author');
    if (!authorSection) return; // Only run on pages with this section

    // Use the same daily cycle logic as Vibe of the Day for consistency
    function getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
        const oneDay = 1000 * 60 * 60 * 24;
        const day = Math.floor(diff / oneDay);
        return day;
    }

    const currentDayOfYear = getDayOfYear(new Date());
    const featuredAuthor = authorsData[currentDayOfYear % authorsData.length];

    if (!featuredAuthor) {
        authorSection.style.display = 'none';
        return;
    }

    // Populate author details
    const authorImageEl = document.getElementById('author-image');
    const authorNameEl = document.getElementById('author-name');
    const authorBioEl = document.getElementById('author-bio');
    const booksContainer = document.getElementById('author-books-container');
    const exploreBtn = document.getElementById('author-explore-btn');

    if (authorImageEl) {
        authorImageEl.src = featuredAuthor.image;
        authorImageEl.alt = `Photo of ${featuredAuthor.name}`;
    }
    if (authorNameEl) authorNameEl.textContent = featuredAuthor.name;
    if (authorBioEl) authorBioEl.textContent = featuredAuthor.bio;

    // Populate author's books
let booksHTML = '';
    const authorBooks = booksData.filter(book => featuredAuthor.bookIds.includes(book.id));
    authorBooks.forEach(book => {
        booksHTML += `
            <div class="col-4 col-md-3 col-lg-2 mb-3">
                <a href="book-details.html?id=${book.id}" class="d-block text-decoration-none">
                    <img src="${book.image}" alt="${book.title}" class="img-fluid rounded shadow-sm">
                    <p class="text-center text-muted small mt-1 mb-0">${book.title}</p>
                </a>
            </div>
        `;
    });
    if (document.getElementById('author-nationality')) {
         document.getElementById('author-nationality').textContent = featuredAuthor.nationality;
    }

      if (document.getElementById('author-birthdate')) {
         document.getElementById('author-birthdate').textContent = "October 10, 1979";
    }







    if (document.getElementById('author-genres')) {
         document.getElementById('author-genres').textContent = featuredAuthor.genre;
    }

     if (document.getElementById('author-awards')) {
         document.getElementById('author-awards').textContent = "Bram Stoker Award";
    }


    if (booksContainer) {
        booksContainer.innerHTML = booksHTML;
    } // Missing closing brace for if (booksContainer)

    // Update the "Explore All" button
    if (exploreBtn) {
        exploreBtn.textContent = `Explore All Books by ${featuredAuthor.name}`;
        exploreBtn.href = `search-results.html?query=${encodeURIComponent(featuredAuthor.name)}`;
    }
}
document.addEventListener ( 'DOMContentLoaded',function() {
    populateFeaturedAuthor() ;
});

// Function to display a random book on the surprise.html page
function displayRandomBook() {
    const randomBookContainer = document.getElementById('random-book-display');

    if (!randomBookContainer || !booksData || booksData.length === 0) {
        console.error("Required elements or booksData not found for displayRandomBook.");
        if (randomBookContainer) randomBookContainer.innerHTML = "<p class='text-center text-danger'>Could not load a surprise book at this time.</p>";
        return;
    }

    // Add animation class to hide and prepare for new content
    randomBookContainer.classList.add('book-fade-out');

    setTimeout(() => { // Wait for fade-out animation to complete
        const randomIndex = Math.floor(Math.random() * booksData.length);
        const book = booksData[randomIndex];

        // Clear previous content and inject new book details
        randomBookContainer.innerHTML = `
            <div class="row align-items-center justify-content-center">
                <div class="col-md-4 text-center mb-4 mb-md-0 position-relative">
                    <img src="${book.image}" alt="Cover of ${book.title}" class="img-fluid rounded shadow-lg surprise-book-cover" id="surprise-book-image">
                </div>
                <div class="col-md-6 text-md-start text-center">
                    <h2 class="surprise-book-title">${book.title}</h2>
                    <p class="surprise-book-author text-muted">by ${book.author}</p>
                    <p class="surprise-book-description">${book.description.split('\n')[0]}</p>
                    <p class="surprise-book-price lead fw-bold">₹${Math.round(book.price)}</p>
                    <button class="btn btn-primary surprise-add-to-cart-btn" data-book-id="${book.id}">
                        <i class="fas fa-cart-plus me-2"></i>Add to Cart
                    </button>
                    <a href="book-details.html?id=${book.id}" class="btn btn-outline-secondary ms-2">View Details</a>
                </div>
            </div>
        `;

        // Attach event listeners for the new buttons
        const addToCartBtn = randomBookContainer.querySelector('.surprise-add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => addToCart(book));
        }

        // Remove fade-out and add fade-in class to trigger animation
        randomBookContainer.classList.remove('book-fade-out');
        randomBookContainer.classList.add('book-fade-in');
        randomBookContainer.addEventListener('animationend', () => {
            randomBookContainer.classList.remove('book-fade-in');
        }, { once: true });

    }, 300); // Match fade-out duration
}

// BookVibe Custom JavaScript - DOMContentLoaded ensures the DOM is ready

// Helper function to add event listeners to wishlist buttons on cards
function addWishlistButtonListeners(container) {
    const wishlistCardBtns = container.querySelectorAll('.wishlist-btn-card');
    wishlistCardBtns.forEach(btn => {
        btn.addEventListener('click', function (event) { // Add event parameter
            event.preventDefault(); // Prevent any default action of the button
            event.stopPropagation(); // Standard stop bubbling
            event.stopImmediatePropagation(); // Stop other listeners on this button and also stops bubbling
            const bookId = parseInt(this.dataset.bookId);
            // console.log('Wishlist button clicked on card for book ID:', bookId, 'Element:', this); // For debugging
            toggleWishlist(bookId, this); // Pass the button element
        });
    });
}

// New function to initialize all wishlist button states on page load
function initializeAllWishlistButtonStates() {
    const allWishlistButtons = document.querySelectorAll('.wishlist-btn');
    allWishlistButtons.forEach(button => {
        const bookId = parseInt(button.dataset.bookId);
        if (!isNaN(bookId)) {
            // Ensure the icon structure is fas fa-heart before updating
            if (!button.querySelector('i.fas.fa-heart')) {
                button.innerHTML = '<i class="fas fa-heart"></i>';
            }
            updateWishlistButtons(bookId); // Applies .active class and ensures correct icon display via CSS
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    console.log("BookVibe JS Loaded and DOM ready!");
});

window.onload = function () {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
        });
    } else {
        console.error("AOS library was not loaded by window.onload. Animations will not work.");
    }
};

// Navbar shrink on scroll
const header = document.querySelector('.main-header');
if (header) {
    const scrollThreshold = 50; // Pixels to scroll before shrinking

    const handleScroll = () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on page load in case it's already scrolled
}

const moodCardLinks = document.querySelectorAll('.mood-card-link');
if (moodCardLinks.length > 0) {
    moodCardLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const mood = this.dataset.mood;
            if (mood) {
                window.location.href = `mood-books.html?mood=${encodeURIComponent(mood)}`;
            }
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length > 1 && href.startsWith('#')) {
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

const quotes = [
    { text: "A room without books is like a body without a soul.", cite: "Marcus Tullius Cicero" },
    { text: "The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.", cite: "Jane Austen, Northanger Abbey" },
    { text: "So many books, so little time.", cite: "Frank Zappa" },
    { text: "If you don't like to read, you haven't found the right book.", cite: "J.K. Rowling" },
    { text: "There is no friend as loyal as a book.", cite: "Ernest Hemingway" }
];
const quoteTextElement = document.getElementById('bookQuote');
const quoteCiteElement = document.getElementById('bookCite');
const newQuoteBtn = document.getElementById('newQuoteBtn');

if (newQuoteBtn && quoteTextElement && quoteCiteElement) {
    newQuoteBtn.addEventListener('click', function () {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteTextElement.style.opacity = 0;
        quoteCiteElement.style.opacity = 0;
        setTimeout(() => {
            quoteTextElement.textContent = randomQuote.text; // Remove explicit double quotes
            quoteCiteElement.textContent = randomQuote.cite;
            quoteTextElement.style.opacity = 1;
            quoteCiteElement.style.opacity = 1;
        }, 300);
    });
}

const newsletterForm = document.getElementById('newsletterForm');
const formMessage = document.getElementById('formMessage');
if (newsletterForm && formMessage) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = document.getElementById('newsletterEmail');
        if (emailInput.value && emailInput.checkValidity()) {
            formMessage.textContent = "Thanks for subscribing! Get ready for some awesome book vibes.";
            formMessage.className = 'mt-3 alert alert-success';
            emailInput.value = '';
        } else {
            formMessage.textContent = "Please enter a valid email address.";
            formMessage.className = 'mt-3 alert alert-danger';
        }
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'mt-3';
        }, 5000);
    });
}

const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const sections = Array.from(document.querySelectorAll('main section[id]'));

function setActiveLink(activeHref = null) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        let isMatch = false;

        if ((activeHref === 'index.html' || activeHref === '#') && (linkHref === 'index.html' || linkHref === '#')) {
            isMatch = true;
        } else if (linkHref === activeHref) {
            isMatch = true;
        }

        if (isMatch) {
            link.classList.add('active');
        }
    });
}

function changeNavOnScroll() {
    let currentSectionId = null;
    const scrollPosition = window.pageYOffset;
    const isIndexPage = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html');

    if (isIndexPage) {
        if (sections.length > 0 && scrollPosition < (sections[0].offsetTop - 150)) {
            const homeLink = Array.from(navLinks).find(link => link.getAttribute('href') === '#' || link.getAttribute('href') === 'index.html');
            if (homeLink) currentSectionId = homeLink.getAttribute('href');
        } else {
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop - 150 && scrollPosition < sectionTop + sectionHeight - 150) {
                    currentSectionId = `#${section.getAttribute('id')}`;
                    break;
                }
            }
        }
        if (!currentSectionId && scrollPosition + window.innerHeight >= document.body.offsetHeight - 50) {
            const lastSection = sections[sections.length - 1];
            if (lastSection) {
                currentSectionId = `#${lastSection.getAttribute('id')}`;
            }
        }
        setActiveLink(currentSectionId);
    }
    // For non-index pages, active link is set statically below.
}

if (sections.length > 0 && (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html'))) {
    window.addEventListener('scroll', changeNavOnScroll);
}

// Initial active link setting based on current page
if (window.location.pathname.includes('book-details.html')) {
    setActiveLink('index.html');
} else if (window.location.pathname.includes('genres.html')) {
    setActiveLink('genres.html');
} else if (window.location.pathname.includes('genre-books.html')) {
    setActiveLink('genres.html');
} else if (window.location.pathname.includes('mood-books.html')) {
    setActiveLink('index.html#mood-discovery');
} else if (window.location.pathname.includes('profile.html')) {
    setActiveLink('profile.html');
} else if (window.location.pathname.includes('search-results.html')) {
    setActiveLink('index.html'); // Set "Home" active on search results page
} else if (window.location.pathname.includes('wishlist.html')) {
    setActiveLink('wishlist.html'); // Set "Wishlist" active
} else if (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html')) {
    // For index.html, rely on scroll or initial top position
    const homeLinkInitial = Array.from(navLinks).find(link => link.getAttribute('href') === '#' || link.getAttribute('href') === 'index.html');
    if (sections.length > 0 && window.pageYOffset < (sections[0]?.offsetTop - 150 || 100) && homeLinkInitial) {
        setActiveLink(homeLinkInitial.getAttribute('href'));
    } else {
        changeNavOnScroll(); // Calculate based on scroll position
    }
}

// Page specific initializations
if (document.getElementById('book-details')) {
    console.log("On book-details page, calling displayBookDetails.");
    displayBookDetails();
} else if (document.getElementById('genres-page')) {
    console.log("On genres page, calling displayGenres.");
    displayGenres();
} else if (document.getElementById('genre-specific-books-page')) {
    console.log("On genre-specific books page, calling displayGenreSpecificBooks.");
    displayGenreSpecificBooks();
} else if (document.getElementById('mood-specific-books-page')) {
    console.log("On mood-specific books page, calling displayMoodSpecificBooks.");
    displayMoodSpecificBooks();
} else if (document.getElementById('search-results-page')) {
    console.log("On search results page, calling displaySearchResultsPage.");
    displaySearchResultsPage();
} else if (document.getElementById('wishlist-page')) {
    console.log("On wishlist page, calling displayWishlistPage function.");
    displayWishlistPage();
} else if (document.getElementById('cart-page')) {
    console.log("On cart page, calling displayCartPage.");
    displayCartPage();
} else if (document.getElementById('surprise-me-page')) { // Check for the new page ID
    console.log("On surprise me page, calling displayRandomBook.");
    displayRandomBook(); // Display the first random book on load
    const surpriseMeAgainBtn = document.getElementById('surpriseMeAgainBtn');
    if (surpriseMeAgainBtn) {
        surpriseMeAgainBtn.addEventListener('click', displayRandomBook); // Attach listener for "Surprise Me Again!"
    }
} else if (document.getElementById('editProfileForm')) { // Check for profile page (using form ID as a key element)
    console.log("On profile page, initializing profile functions.");
    displayUserProfile(); // Display current profile data
    displayOrderHistory(); // Display initial order history
} else if (document.getElementById('checkout-page')) {
    console.log("On checkout page, initializing checkout functions.");

    const checkoutOrderSummary = document.getElementById('checkoutOrderSummary');
    const urlParams = new URLSearchParams(window.location.search);
    const isBuyNowFlow = urlParams.get('buyNow') === 'true';
    const buyNowItemString = sessionStorage.getItem('bookVibeBuyNowItem');
    let buyNowItem = null;

    let itemsToDisplay = [];
    let currentSubtotal = 0;

    if (isBuyNowFlow && buyNowItemString) {
        try {
            buyNowItem = JSON.parse(buyNowItemString);
        } catch (e) {
            console.error("Error parsing buyNowItem from sessionStorage:", e);
        }
        if (buyNowItem) {
            itemsToDisplay.push(buyNowItem);
            currentSubtotal = buyNowItem.price * buyNowItem.quantity;
        } else {
            checkoutOrderSummary.innerHTML = '<p class="text-danger">Error: The selected book for "Buy Now" was not found.</p>';
            // No return here, let it fall through to the form listener
        }
    } else {
        itemsToDisplay = [...cart];
        itemsToDisplay.forEach(item => {
            currentSubtotal += item.price * item.quantity;
        });
    }

    if (checkoutOrderSummary && itemsToDisplay.length > 0) {
        let summaryHTML = '<ul class="list-group list-group-flush">';
        itemsToDisplay.forEach(item => {
            summaryHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
                                ${item.title} (x${item.quantity})
                                <span>₹${Math.round(item.price * item.quantity)}</span>
                            </li>`;
        });
        summaryHTML += `<li class="list-group-item d-flex justify-content-between align-items-center fw-bold">
                            Total
                            <span>₹${Math.round(currentSubtotal)}</span>
                        </li>`;
        summaryHTML += '</ul>';
        checkoutOrderSummary.innerHTML = summaryHTML;
    } else if (checkoutOrderSummary) {
        checkoutOrderSummary.innerHTML = '<p class="text-muted">Your cart is empty. Please add items to your cart first.</p><a href="index.html" class="btn btn-sm btn-primary">Continue Shopping</a>';
    }

    const shippingForm = document.getElementById('shippingForm');
    if (shippingForm) {
        shippingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const newOrder = {
                id: `BV-${Date.now()}`, date: new Date().toISOString(), items: [...itemsToDisplay], total: currentSubtotal, status: 'Processing'
            };
            orders.unshift(newOrder);
            saveOrders();
            alert('Order Placed (Mock)! Thank you for your purchase.');
            if (isBuyNowFlow) { sessionStorage.removeItem('bookVibeBuyNowItem'); }
            else { cart.length = 0; saveCart(); }
            updateCartCount();
            window.location.href = 'profile.html#order-history';
        });
    }
}

// Homepage specific initializations
if (document.getElementById('featured-books')) {
    populateFeaturedBooks();
}
if (document.getElementById('spotlight-title')) {
    populateVibeSpotlight();
}
if (document.getElementById('featured-author')) {
    populateFeaturedAuthor();
}

const profileForm = document.getElementById('editProfileForm');
if (profileForm) {
    profileForm.addEventListener('submit', handleProfileFormSubmit);
}

const settingsForm = document.getElementById('settingsForm');
if (settingsForm) {
    settingsForm.addEventListener('submit', handleSettingsFormSubmit);
}

const profilePicUploadInput = document.getElementById('profilePicUpload');
if (profilePicUploadInput) {
    profilePicUploadInput.addEventListener('change', handleProfilePictureChange);
}
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default link behavior if it's an <a> tag
        handleLogout();
    });
}

// Add listener for Vibe Stats tab to trigger animation
const vibeStatsTabTrigger = document.querySelector('a[data-bs-toggle="pill"][href="#my-vibes"]');
if (vibeStatsTabTrigger) {
    vibeStatsTabTrigger.addEventListener('shown.bs.tab', function (event) {
        animateVibeStats();
    });
}

const orderHistoryTabTrigger = document.querySelector('a[data-bs-toggle="pill"][href="#order-history"]');
if (orderHistoryTabTrigger) {// E-commerce: Shopping Cart Functionality - Make these global
    let cart;
    let wishlist;
    let orders;

    try {
        const storedCart = localStorage.getItem('bookVibeCart');
        cart = storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
        console.error("Error loading cart from localStorage:", e);
        cart = []; // Fallback to an empty cart
    }

    try {
        const storedWishlist = localStorage.getItem('bookVibeWishlist');
        wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (e) {
        console.error("Error loading wishlist from localStorage:", e);
        wishlist = []; // Fallback to an empty wishlist
    }

    try {
        const storedOrders = localStorage.getItem('bookVibeOrders');
        orders = storedOrders ? JSON.parse(storedOrders) : [];
    } catch (e) {
        console.error("Error loading orders from localStorage:", e);
        orders = []; // Fallback to an empty array
    }

    // Sample Book Data (Ideally, this would come from a backend or a separate JSON file)
    const booksData = [
        // Removed duplicate book with id: 1 (Fourth Wing), keeping id: 21
        {
            id: 2,
            title: "It Starts With Us",
            author: "Colleen Hoover",
            price: 499, // Price as a whole number
            image: "assets/books/bestsellers/itstartswithus.jpg", // Example local path
            description: `Before it ends, it begins again.
        Colleen Hoover returns with the powerful, heart-stirring sequel to It Ends With Us — this time from Atlas’s point of view. It Starts With Us gives readers the long-awaited love story between Lily and Atlas, offering healing, hope, and the kind of second chance that makes your heart ache in the best way.
        ✨ Raw, romantic, and emotionally addictive — perfect for fans of slow-burn love, emotional growth, and beautifully flawed characters.
        🔖 "Sometimes the one who heals you is the one who was always meant to stay."`,
            genre: "Romance", // Corrected Genre
            publicationDate: "2022",
        moods: ["Inspiring", "Thought-Provoking"],
        language: "English"
        },
        {
            id: 3,
            title: "Lessons in Chemistry",
            author: "Bonnie Garmus",
            price: 499, // Price as a whole number
            image: "assets/books/bestsellers/lessonsinchemistry.jpg", // Example local path
            description: `She’s not just stirring the pot—she’s changing the recipe.
        Meet Elizabeth Zott, a brilliant chemist in the 1960s who’s not afraid to challenge the rules—of science, society, and sexism. When she’s pushed out of the lab and onto a TV cooking show, she turns housewives into thinkers and the kitchen into a classroom. Smart, sharp, and delightfully rebellious, Lessons in Chemistry is a tribute to every woman who’s ever been underestimated.
        
        ✨ Bold, witty, and deeply moving—this is more than a story. It’s a revolution in a lab coat.
        
            🧪 "Cooking is chemistry. And chemistry means change."`,
            genre: "Historical Fiction", // Corrected Genre
            publicationDate: "2022",
        moods: ["Mysterious", "Emotional", "Historical"],
        language: "English"
        },
        {
            id: 4,
            title: "Happy Place",
            author: "Emily Henry",
            price: 499, // Price as a whole number
            image: "assets/books/bestsellers/happyplace.jpg", // Example local path
            description: `They broke up months ago. They just haven’t told anyone yet.
        Harriet and Wyn were the perfect couple—until they weren’t. But when their annual getaway with friends rolls around, they find themselves pretending to still be together to avoid breaking the group’s fragile peace. As memories resurface and emotions bubble beneath the surface, they must ask themselves: was their happy place ever really lost—or just waiting to be reclaimed?
        
        💗 A tender, witty, and achingly honest love story about second chances, chosen family, and the spaces we call home. Emily Henry does it again—this one's for the hopeless romantics.
        
            🏡 "Sometimes the right person comes at the wrong time… but love has a way of circling back."`,
            genre: "Romance", // Corrected Genre
            publicationDate: "2023",
        moods: ["Mysterious", "Intelligent"],
        language: "English"
        },
        {
            id: 5,
            title: "Verity",
            author: "Colleen Hoover",
            price: 499, // Price as a whole number
            image: "assets/books/bestsellers/verity.jpg", // Example local path
            description: `Truth is scarier than fiction.
        Lowen Ashleigh, a struggling writer, is hired to finish bestselling author Verity Crawford’s novels after Verity suffers a mysterious accident. But inside her eerie home, Lowen uncovers an unpublished autobiography filled with chilling confessions. As obsession takes root and boundaries blur, she must decide—how far is she willing to go for the truth?
        
        🕯️ Sinister, seductive, and impossible to put down—Verity is Colleen Hoover like you’ve never read her before.
        
            📓 "Some secrets should stay buried... but some scream to be heard."`,
            genre: "Thriller", // Corrected Genre
            publicationDate: "2018",
        moods: ["Adventurous", "Inspiring", "Intelligent"],
        language: "English"
        },
        {
            id: 6,
            title: "The Seven Husbands of Evelyn Hugo",
            author: "Taylor Jenkins Reid",
            price: 499, // Price as a whole number
            image: "assets/books/bestsellers/thesevenhusbandsofevelynhugo.jpg", // Example local path
            description: `Everyone knows her name. No one knows her truth.
        Aging Hollywood icon Evelyn Hugo is finally ready to tell her scandalous life story—on her own terms. From rising stardom to seven headline-making marriages, she unveils a tale of ruthless ambition, forbidden love, and sacrifices made in the name of fame. But as journalist Monique Grant listens closely, she realizes Evelyn’s past is entwined with her own future in ways she never imagined.
        
        💚 Dazzling, intimate, and heartbreakingly human—The Seven Husbands of Evelyn Hugo is a timeless story about the price of fame and the power of choosing love, no matter the cost.
        
            🎞️ "Never let anyone make you feel ordinary."`,
            genre: "Romance",
            publicationDate: "2017",
        moods: ["Romantic", "Cozy", "Funny"],
        language: "English"
        },
        {
            id: 7,
            title: "The Spanish Love Deception",
            author: "Elena Armas",
            price: 499, // Price as a whole number
            image: "assets/books/bestsellers/thespanishlovedeception.jpg", // Example local path
            description: `One fake date. A wedding in Spain. What could possibly go wrong?
        Catalina Martín needs a date to her sister’s wedding in Spain—especially with her ex (and his fiancée) attending. Enter Aaron Blackford: tall, brooding, and insufferable… and now pretending to be her boyfriend. As sparks fly and lines blur, Catalina must confront the possibility that their fake romance might just be the real thing.
        
        💌 Equal parts hilarious, heartwarming, and undeniably steamy—The Spanish Love Deception is a deliciously slow-burn romance that will have you smiling, swooning, and believing in love all over again.
        
            ❤️ "The line between pretending and falling is thinner than you think."
        
        `,
            genre: "Romance", // Corrected Genre
            publicationDate: "2021",
        moods: ["Historical", "Emotional"],
        language: "Spanish"
        },
        // Removed duplicate book with id: 8 (Babel), keeping id: 24
        // Removed duplicate book with id: 9 (The Atlas Six), keeping id: 23
        // Removed duplicate book with id: 10 (Tomorrow, and Tomorrow, and Tomorrow), keeping id: 19
        {
            id: 11,
            title: "The Silent Patient",
            author: "Alex Michaelides",
            price: 449, // Price as a whole number
            image: "assets/books/bestsellers/thesilentpatient.jpg", // Example local path
            description: `She murdered her husband. And then she never spoke again.
        Alicia Berenson had the perfect life—until she shot her husband five times and went completely silent. Her refusal to speak turns a shocking crime into a national obsession. Enter Theo Faber, a criminal psychotherapist determined to uncover the truth behind Alicia’s silence. But the closer he gets, the darker—and more twisted—the story becomes.
        
        🕯️ A haunting, mind-bending thriller with a jaw-dropping twist you won’t see coming—The Silent Patient will keep you questioning everything until the final page.
        
            🔐 "Sometimes the biggest secrets are the ones we keep from ourselves."`,
            genre: "Thriller", // Corrected Genre
            publicationDate: "2019",
        },
        {
            id: 12,
            title: "Book Lovers",
            author: "Emily Henry",
            price: 499, // Price as a whole number
            image: "assets/books/bestsellers/booklovers.jpg", // Example local path
            description: `She’s read this story before. But this time, the ending might surprise her.
        Nora Stephens is a sharp-tongued literary agent who knows all the tropes—especially the one where career women get dumped for small-town sweethearts. So when she ends up in Sunshine Falls with her sister for a month-long escape, the last person she expects to keep bumping into is Charlie Lastra, a brooding editor from the city. As the pages of their story unfold, Nora must decide whether love can be found in the most unexpected plot twist of all—her own.
        
        📖 Witty, emotional, and full of love for book lovers everywhere—Emily Henry delivers another swoon-worthy tale of second chances, sharp banter, and happily-ever-afters that feel earned.
        
            💞 "Some stories rewrite you, even when you thought you knew the ending."
        
        `,
            genre: "Romance", // Corrected Genre
            publicationDate: "2022",
            moods: ["Educational", "Inspiring", "Historical", "Intelligent"]
        },
        {
            id: 13,
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            price: 499,
            image: "assets/books/thehobbit.jpg",
            description: `Bilbo Baggins never asked for adventure. But when a wandering wizard and a band of dwarves appear at his door, he’s swept into a journey across Middle-earth—through ancient forests, goblin tunnels, and to the very lair of a fire-breathing dragon. Along the way, Bilbo discovers a courage he never knew he had—and a ring that will shape the fate of the world.
        
        💫 Enchanting, witty, and brimming with magic—The Hobbit is a beloved prelude to Tolkien’s epic saga, and a must-read for dreamers and wanderers alike.
        
        🧝‍♂️ "There is more in you of good than you know, child of the kindly West."`,
            genre: "Fantasy", // Corrected Genre
            publicationDate: "1937",
            moods: ["Adventurous", "Cozy"]
        },
        {
            id: 14,
            title: "The Martian",
            author: "Andy Weir",
            price: 450,
            image: "assets/books/themartian.jpg",
            description: `He was left for dead. But he's not done fighting.
        
        When astronaut Mark Watney is stranded alone on Mars after a mission gone wrong, he's faced with impossible odds. Armed with nothing but his engineering genius, unshakable wit, and a fierce will to survive, he must turn a barren planet into a lifeline—one ingenious hack at a time.
        
        🌌 Brilliantly funny, scientifically thrilling, and emotionally gripping—The Martian is a survival story like no other, celebrating human resilience at its finest.
        
        🛠️ "I’m gonna have to science the hell out of this."`,
            genre: "Science Fiction", // Corrected Genre
            publicationDate: "2011",
            moods: ["Adventurous", "Intelligent"]
        },
        {
            id: 15,
            title: "Life of Pi",
            author: "Yann Martel",
            price: 399,
            image: "assets/books/lifeofpi.jpg",
            description: `One boy. One boat. One tiger. Infinite wonder.
        
        After a shipwreck leaves him stranded in the Pacific Ocean, sixteen-year-old Pi Patel must survive in a lifeboat—with only a Bengal tiger named Richard Parker for company. What follows is a spellbinding odyssey that blurs the line between truth and faith, fear and beauty, survival and storytelling.
        
        🪷 Lush, lyrical, and deeply spiritual—Life of Pi is a masterwork of imagination and resilience that dares you to believe in the extraordinary.
        
        🐅 "The world isn’t just the way it is. It’s how we understand it."`,
            genre: "Adventure",
            publicationDate: "2001",
            moods: ["Adventurous", "Emotional"]
        },
        {
            id: 16,
            title: "The Alchemist",
            author: "Paulo Coelho",
            price: 350,
            image: "assets/books/thealchemist.jpg",
            description: `Follow your heart. It knows the way.
        
        Santiago, a young Andalusian shepherd, dreams of finding a hidden treasure buried far beyond the desert. But what he discovers instead is a journey of self-discovery—guided by omens, alchemy, and the whispers of the universe. Every step takes him closer to understanding the true meaning of his Personal Legend.
        
        ✨ Timeless, poetic, and profoundly wise—The Alchemist is a luminous tale about destiny, dreams, and the magic of listening to your soul.
        
        🔮 "And, when you want something, all the universe conspires in helping you to achieve it."`,
            genre: "Adventure", // Could also be Philosophical Fiction or Literary Fiction
            publicationDate: "1988",
            moods: ["Inspiring", "Thought-Provoking"]
        },
        {
            id: 17,
            title: "Little Fires Everywhere",
            author: "Celeste Ng",
            price: 499,
            image: "assets/books/littlefires.jpg",
            description: `In Shaker Heights, everything is planned—until it burns.
        
        When artist and single mother Mia Warren arrives with her daughter in an idyllic suburban town, their lives quietly ignite long-buried secrets in the picture-perfect Richardson family. As ideals clash and loyalties fracture, the spark of one small decision sets everything ablaze.
        
        🔥 Rich in emotion and moral complexity, Little Fires Everywhere is a searing exploration of motherhood, privilege, and the illusion of perfection.
        
        🕯️ "Sometimes you need to scorch everything to the ground and start over."`,
            genre: "Contemporary Fiction",
            publicationDate: "2017",
            moods: ["Emotional", "Thought-Provoking"]
        },
        {
            id: 18,
            title: "The Midnight Library",
            author: "Matt Haig",
            price: 399,
            image: "assets/books/midnightlibrary.jpg",
            description: `Between life and death, there is a library.
        
        Nora Seed finds herself in a mysterious library where every book offers a chance to live a different version of her life. From unrealized dreams to paths not taken, she explores the infinite possibilities of “what could have been”—and discovers what truly makes life worth living.
        
        🌌 Thoughtful, uplifting, and quietly magical—The Midnight Library is a beautiful reminder that every life holds value, and every moment a spark of hope.
        
        ✨ "You don’t have to understand life. You just have to live it."`,
            genre: "Contemporary Fiction", // Added missing genre
            publicationDate: "2020",
            moods: ["Cozy", "Inspiring"]
        },
        {
            id: 19,
            title: "Tomorrow, and Tomorrow, and Tomorrow",
            author: "Gabrielle Zevin",
            price: 499,
            image: "assets/books/tomorrowandtomorrow.jpg",
            description: `More than a love story. It’s a story about love—in all its forms.
        When Sam and Sadie meet in a hospital game room as kids, a bond forms over pixels and imagination. Years later, they reunite to build a groundbreaking video game—and a lifelong creative partnership. Spanning decades, coasts, and personal battles, Tomorrow, and Tomorrow, and Tomorrow is a poignant exploration of friendship, art, ambition, and the infinite lives we get to live in the games we create… and the people we love.
        
        🕹️ Thoughtful, nostalgic, and deeply human—this is a novel for anyone who’s ever searched for meaning through play, creation, or connection.
        
            💔 "What is a game, if not a world you get to live in—if only for a while?"`,
            genre: "Contemporary Fiction",
            publicationDate: "2022",
            moods: ["Intelligent", "Emotional"]
        },
        {
            id: 20,
            title: "The Paper Palace",
            author: "Miranda Cowley Heller",
            price: 449,
            image: "assets/books/paperpalace.jpg",
            description: `One summer day. One life-changing choice.
        
        In the golden stillness of a Cape Cod morning, Elle Bishop makes a decision that will ripple through the past and future of her life. Torn between the comfort of her marriage and the passion of a childhood love, she is forced to confront long-buried secrets, trauma, and the complexity of desire.
        
        💔 Lyrical, raw, and deeply human—The Paper Palace is a powerful meditation on memory, identity, and the consequences of the paths we choose.
        
        🌊 "Things can be true and not true, both at the same time."`,
            genre: "Contemporary Fiction",
            publicationDate: "2021",
            moods: ["Cozy", "Emotional"]
        },
        {
            id: 21,
            title: "Fourth Wing",
            author: "Rebecca Yarros",
            price: 599,
            image: "assets/books/fourthwing2.jpg",
            description: `Enter the elite war college where dragons choose their riders—and only the strong survive.
        Violet Sorrengail was meant to live a quiet life among books, not dragons. But fate throws her into Basgiath War College, where ruthless training, deadly trials, and cutthroat competition are just the beginning.🔥 Packed with fiery romance, deadly magic, and jaw-dropping twists—Fourth Wing is a brutal, beautiful ride you won't want to end.
        🐲 "Dragons don't bond with fragile girls. But what if she's stronger than anyone thinks?"`,
            genre: "Fantasy",
            publicationDate: "2023",
            moods: ["Adventurous", "Romantic"]
        },
        {
            id: 22,
            title: "A Court of Thorns and Roses",
            author: "Sarah J. Maas",
            price: 549,
            image: "assets/books/courtofthornsandroses.jpg",
            description: `A mortal girl. A cursed land. A deadly bargain.
        
        When nineteen-year-old Feyre kills a wolf in the woods, she’s dragged into a fae realm for retribution—only to find her captor is a brooding High Fae lord. As she navigates courtly intrigues and ancient magic, Feyre’s hatred begins to transform into something far more dangerous: desire. But a shadow threatens everything... and love may be the key to survival.
        
        🖤 Seductive, fierce, and spellbinding—A Court of Thorns and Roses is a gripping fantasy of passion, sacrifice, and power.
        
        🌒 "Don’t feel bad for one moment about doing what brings you joy."`,
            genre: "Fantasy",
            publicationDate: "2015",
            moods: ["Romantic", "Mysterious"]
        },
        {
            id: 23,
            title: "The Atlas Six",
            author: "Olivie Blake",
            price: 499,
            image: "assets/books/theatlassix.jpg",
            description: `Six magicians. Five will remain. Only the best can survive.
        Each decade, six of the world’s most talented magical thinkers are invited to join the secretive Alexandrian Society—guardians of ancient knowledge lost to time. For the chosen few, entry means power, prestige, and privilege. But as they uncover the truth behind the Society’s purpose, the lines between loyalty and ambition begin to blur—and someone may not make it out alive.
        
        🖤 Seductively intellectual, morally gray, and brimming with tension—The Atlas Six is a dazzling, character-driven fantasy for fans of arcane secrets, high stakes, and mind games.
        
            🗝️ "Knowledge is carnage. You can't have it without sacrifice."`,
            genre: "Fantasy",
            publicationDate: "2020",
            moods: ["Mysterious", "Intelligent"]
        },
        {
            id: 24,
            title: "Babel",
            author: "R.F. Kuang",
            price: 599,
            image: "assets/books/babel.jpg",
            description: `At Oxford, magic is translation—and knowledge is power.
        In 1830s England, orphaned Robin Swift is brought from Canton to train at Oxford’s prestigious Royal Institute of Translation—known as Babel. There, language is literal magic, used to uphold Britain’s global dominance. But as Robin discovers the dark cost of empire and scholarship, he must choose between loyalty to the institution that raised him… or revolution.
        
        📚 Brilliantly layered, fiercely intelligent, and devastatingly relevant—Babel is a genre-defying masterpiece that challenges colonialism, language, and the price of power.
        
            ✨ "Revolution begins with words—and ends with fire."`,
            genre: "Fantasy",
            publicationDate: "2022",
            moods: ["Historical", "Thought-Provoking"]
        }
    ];

    // Global cart helper functions
    function updateCartCount() {
        const cartItemCountElement = document.getElementById('cartItemCount'); // Get it here as it's DOM dependent
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartItemCountElement) {
            cartItemCountElement.textContent = totalItems;
        }
    }

    function saveCart() {
        localStorage.setItem('bookVibeCart', JSON.stringify(cart));
    }

    function saveWishlist() {
        localStorage.setItem('bookVibeWishlist', JSON.stringify(wishlist));
    }

    function saveOrders() {
        localStorage.setItem('bookVibeOrders', JSON.stringify(orders));
    }

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        toast.offsetHeight; // Trigger reflow
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 500);
        }, 3000);
    }

    function addToCart(book) {
        console.log("[addToCart] Function called with book:", JSON.stringify(book)); // Log the book object

        if (!book || typeof book.id === 'undefined' || typeof book.title === 'undefined' || typeof book.price === 'undefined' || typeof book.image === 'undefined') {
            console.error("[addToCart] Invalid or incomplete book object received:", book);
            showToast("Error: Could not add item. Invalid book data.", "error");
            return; // Exit if book data is invalid or incomplete
        }

        console.log("[addToCart] Looking for existing item with ID:", book.id);
        const existingItem = cart.find(item => item.id === book.id);

        if (existingItem) {
            console.log("[addToCart] Existing item found. Incrementing quantity.");
            existingItem.quantity += 1;
        } else {
            console.log("[addToCart] New item. Adding to cart with quantity 1.");
            cart.push({ ...book, quantity: 1 });
        }

        console.log("[addToCart] Calling saveCart(). Current cart state:", JSON.stringify(cart));
        saveCart();
        console.log("[addToCart] Calling updateCartCount().");
        updateCartCount(); // This will update the count in the navbar
        console.log("[addToCart] Calling showToast().");
        showToast(`${book.title} added to cart!`);
        console.log("[addToCart] Cart updated successfully. Final cart:", JSON.stringify(cart));
    }

    // Wishlist Helper Functions
    function isBookInWishlist(bookId) {
        return wishlist.some(item => item.id === bookId);
    }

    function toggleWishlist(bookId, buttonElement = null) { // Added buttonElement parameter
        const book = booksData.find(b => b.id === bookId);
        if (!book) {
            console.error("[toggleWishlist] Book not found for ID:", bookId);
            showToast("Error: Book data not found.", "error");
            return;
        }

        console.log(`[toggleWishlist] Called for book ID: ${bookId}. Initial wishlist state:`, JSON.parse(JSON.stringify(wishlist)));
        const wasInWishlist = isBookInWishlist(bookId); // Check state before toggle
        const bookIndexInWishlist = wishlist.findIndex(item => item.id === bookId);
        console.log(`[toggleWishlist] Book index in wishlist: ${bookIndexInWishlist}. Was in wishlist: ${wasInWishlist}`);

        if (bookIndexInWishlist > -1) {
            wishlist.splice(bookIndexInWishlist, 1); // Remove from wishlist
            console.log(`[toggleWishlist] Removed book. Wishlist after splice:`, JSON.parse(JSON.stringify(wishlist)));
            showToast(`${book.title} removed from wishlist.`, "info");
        } else {
            wishlist.push(book); // Add to wishlist (storing the whole book object)
            console.log(`[toggleWishlist] Added book. Wishlist after push:`, JSON.parse(JSON.stringify(wishlist)));
            showToast(`${book.title} added to wishlist!`);
        }
        saveWishlist();
        updateWishlistButtons(bookId); // Update all relevant buttons on the page

        // Trigger animation on the clicked button's icon if it was just added
        if (buttonElement && !wasInWishlist && isBookInWishlist(bookId)) {
            buttonElement.classList.add('heart-pop-animation');
            // Remove the class after animation completes to allow re-triggering
            buttonElement.addEventListener('animationend', () => {
                buttonElement.classList.remove('heart-pop-animation');
            }, { once: true });
        }
    }

    function updateWishlistButtons(bookId) {
        // This function will update the appearance of wishlist buttons for a specific book
        // It needs to be called after toggling wishlist or when pages load
        const buttons = document.querySelectorAll(`.wishlist-btn[data-book-id="${bookId}"]`);
        console.log(`[updateWishlistButtons] Updating ${buttons.length} buttons for book ID: ${bookId}`);

        buttons.forEach(button => {
            // Ensure the button always contains the filled heart icon structure
            if (!button.querySelector('i.fas.fa-heart')) {
                button.innerHTML = '<i class="fas fa-heart"></i>';
            }

            const isInWishlist = isBookInWishlist(bookId);
            console.log(`[updateWishlistButtons] Book ID ${bookId} in wishlist: ${isInWishlist}. Button:`, button);

            if (isInWishlist) {
                console.log(`[updateWishlistButtons] Adding 'active' class to button for book ID ${bookId}`);
                button.classList.add('active');
            } else {
                console.log(`[updateWishlistButtons] Removing 'active' class from button for book ID ${bookId}`);
                button.classList.remove('active');
            }
            // CSS will handle the visibility and color of the .fas.fa-heart icon
            // based on whether the button has the .active class or is hovered.
        });
    }

    function displayWishlistPage() {
        const wishlistGrid = document.getElementById('wishlist-grid');
        const emptyWishlistMessage = document.getElementById('empty-wishlist-message');
        const wishlistPageTitle = document.getElementById('wishlist-page-title'); // Already in HTML

        if (!wishlistGrid || !emptyWishlistMessage || !wishlistPageTitle) {
            console.error("Required elements not found for displayWishlistPage.");
            if (wishlistGrid) wishlistGrid.innerHTML = "<p class='text-center text-danger col-12'>Could not display wishlist at this time.</p>";
            return;
        }

        // 1. Clear only previously added book cards from wishlistGrid.
        //    Give dynamically added book card columns a specific class 'wishlist-book-card-col'
        //    to target them for removal, leaving #empty-wishlist-message intact.
        const existingBookCards = wishlistGrid.querySelectorAll('.wishlist-book-card-col');
        existingBookCards.forEach(card => wishlistGrid.removeChild(card));

        const validWishlistItems = []; // To store items that are still valid and to rebuild the wishlist
        let itemsRendered = false; // Flag to check if any book cards were actually rendered

        // 2. Process current wishlist items, render valid ones, and build validWishlistItems
        wishlist.forEach(wishlistItem => {
            // Fetch the latest book details from booksData using the ID from the wishlist item
            const book = booksData.find(b => b.id === wishlistItem.id);

            if (book) { // Only proceed if the book still exists in the main booksData
                validWishlistItems.push(book); // Add the fresh book data to our list of valid items
                const bookCardCol = document.createElement('div');
                bookCardCol.className = 'col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-4 wishlist-book-card-col'; // Added specific class
                // Using a similar card structure, but with specific actions for wishlist
                bookCardCol.innerHTML = `
                        <div class="book-card h-100">
                            <img src="${book.image}" alt="Cover of ${book.title}" class="card-img-top">
                            <div class="book-info">
                                <h3>${book.title}</h3>
                                <p>${book.author}</p>
                                <p class="book-price">₹${Math.round(book.price)}</p>
                                ${book.hasOwnProperty('stock') ? `<p class="book-stock">${book.stock > 0 ? `In Stock: ${book.stock}` : '<span class="text-danger">Out of Stock</span>'}</p>` : ''}
                                <div class="mt-auto">
                                    <a href="book-details.html?id=${book.id}" class="btn btn-sm btn-outline-primary w-100 mb-2">View Details</a>
                                    <button class="btn btn-sm btn-primary w-100 mb-2 wishlist-add-to-cart-btn" data-book-id="${book.id}">
                                        <i class="fas fa-cart-plus me-1"></i> Add to Cart
                                    </button>
                                    <button class="btn btn-sm btn-outline-danger w-100 wishlist-remove-btn" data-book-id="${book.id}">
                                        <i class="fas fa-trash-alt me-1"></i> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                wishlistGrid.appendChild(bookCardCol);
                itemsRendered = true;
            } else {
                console.warn(`Wishlisted book with ID ${wishlistItem.id} (title: "${wishlistItem.title}") not found in current booksData. It will be removed from the displayed wishlist.`);
            }
        });

        // 3. Update global wishlist if it was cleaned (some items were not found in booksData)
        if (validWishlistItems.length !== wishlist.length) {
            wishlist = validWishlistItems; // Update the global wishlist variable
            saveWishlist(); // Persist the cleaned wishlist
        }

        // 4. Show/hide empty message based on the *final* state of the wishlist
        if (wishlist.length === 0) {
            emptyWishlistMessage.classList.remove('d-none'); // Show the empty message
        } else {
            emptyWishlistMessage.classList.add('d-none'); // Hide the empty message
            if (itemsRendered) { // Only add listeners if cards were actually put on the page
                addWishlistPageButtonListeners();
            }
        }

        // Ensure AOS is re-initialized if items are added dynamically after initial load
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }

    // Function to display book details on book-details.html
    function displayBookDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const bookIdParam = urlParams.get('id');
        const bookId = parseInt(bookIdParam); // Ensure bookId is an integer

        console.log("[displayBookDetails] Called. URL:", window.location.href);
        console.log("[displayBookDetails] Extracted 'id' param:", bookIdParam, "Parsed bookId:", bookId);
        console.log("[displayBookDetails] booksData is defined:", !!booksData, "booksData length:", booksData ? booksData.length : "N/A");

        // Ensure bookId is a valid number and booksData is available and not empty
        if (bookId && !isNaN(bookId) && booksData && booksData.length > 0) {
            const book = booksData.find(b => b.id === bookId);
            console.log("Found book for details page:", book);

            if (book) {
                // Clear any previous error/fallback message
                const detailsSection = document.getElementById('book-details');
                // Check if the first child is the fallback div and remove it if so.
                if (detailsSection.firstChild && detailsSection.firstChild.classList && detailsSection.firstChild.classList.contains('text-center')) {
                    // This is a basic check; more robust would be to give the fallback div an ID.
                    // For now, we assume if we found a book, we should clear out the section before repopulating.
                    // Or, ensure that the elements below are direct children and will overwrite.
                }
                console.log("Book Title from object:", book.title);
                console.log("Book Author from object:", book.author);
                console.log("Book Image URL from object:", book.image);
                console.log("Book Description from object:", book.description);
                console.log("Book Genre from object:", book.genre);
                console.log("Book Publication Date from object:", book.publicationDate);
                console.log("Book Price from object:", book.price);

                document.getElementById('book-image').src = book.image;
                document.getElementById('book-title').textContent = book.title;
                document.getElementById('book-author').textContent = book.author;
                document.getElementById('book-description').textContent = book.description;
                document.getElementById('book-genre').textContent = book.genre;
                document.getElementById('book-publication-date').textContent = book.publicationDate;
                document.getElementById('book-price').textContent = `₹${Math.round(book.price)}`;

                // --- New Additions for Book Details Enhancement ---
                const starRatingElement = document.getElementById('book-stars');
                if (starRatingElement) {
                    // Static 4.5 stars for demonstration
                    starRatingElement.innerHTML = `
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            <span class="ms-2 text-muted">(1,234 ratings)</span> <!-- Placeholder for number of ratings -->
                        `;
                }

                const stockStatusElement = document.getElementById('book-stock-status');
                if (stockStatusElement) {
                    // Static "In Stock" for demonstration
                    stockStatusElement.textContent = "In Stock";
                    stockStatusElement.classList.add('in-stock');
                }
                // --- End New Additions ---

                const addToCartButton = document.getElementById('add-to-cart-btn');
                if (addToCartButton) {
                    const newAddToCartButton = addToCartButton.cloneNode(true);
                    addToCartButton.parentNode.replaceChild(newAddToCartButton, addToCartButton);
                    newAddToCartButton.addEventListener('click', () => {
                        console.log("Details page 'Add to Cart' clicked. Book data:", book);
                        addToCart(book);
                    });
                }

                const shopThisBookBtn = document.getElementById('details-shop-btn');
                if (shopThisBookBtn) {
                    const newShopBtn = shopThisBookBtn.cloneNode(true);
                    shopThisBookBtn.parentNode.replaceChild(newShopBtn, shopThisBookBtn);
                    newShopBtn.addEventListener('click', () => {
                        // DO NOT add to the main cart for "Shop This Book" / "Buy Now"
                        // Instead, store the whole book object (with quantity 1) for the buy now flow
                        sessionStorage.setItem('bookVibeBuyNowItem', JSON.stringify({ ...book, quantity: 1 }));
                        window.location.href = 'checkout.html?buyNow=true'; // Redirect with a flag
                    });
                } else {
                    console.warn("[displayBookDetails] 'details-shop-btn' not found.");
                }

                // Re-add logic for the "More in [Genre]" button
                const moreInGenreLinkBtn = document.getElementById('details-more-in-genre-link');
                if (moreInGenreLinkBtn && book.genre) {
                    moreInGenreLinkBtn.href = `genre-books.html?genre=${encodeURIComponent(book.genre)}`;
                    moreInGenreLinkBtn.innerHTML = `<i class="fas fa-search me-2"></i>More in ${book.genre}`; // Update text dynamically
                    console.log(`[displayBookDetails] Set 'More in ${book.genre}' button link to: ${moreInGenreLinkBtn.href}`);
                } else if (moreInGenreLinkBtn) {
                    moreInGenreLinkBtn.style.display = 'none'; // Hide if no genre
                }

                const wishlistButton = document.getElementById('details-wishlist-btn');
                if (wishlistButton) {
                    wishlistButton.dataset.bookId = book.id; // Set book ID for the button
                    // updateWishlistButtons(book.id); // Initial state handled by initializeAllWishlistButtonStates
                    // Clone and replace to remove old listeners, then add new one
                    const newWishlistButton = wishlistButton.cloneNode(true); // Clone to ensure fresh listeners
                    wishlistButton.parentNode.replaceChild(newWishlistButton, wishlistButton);

                    // Define a single, clear event handler for the click
                    const detailsPageWishlistClickHandler = function (event) {
                        event.preventDefault();
                        // event.stopPropagation(); // Optional: if needed to stop event bubbling

                        const currentBookId = parseInt(this.dataset.bookId); // Re-fetch bookId from 'this'
                        console.log(`Details page wishlist button clicked for book ID: ${currentBookId}. Button element:`, this);
                        toggleWishlist(currentBookId, this); // 'this' is the button element
                    };

                    newWishlistButton.addEventListener('click', detailsPageWishlistClickHandler);
                }
            } else {
                console.error(`Book with ID ${bookId} not found in booksData.`);
                const detailsSection = document.getElementById('book-details');
                if (detailsSection) {
                    detailsSection.innerHTML = '<p class="text-center text-danger">Book not found.</p>';
                }
            }
        } else {
            console.error('[displayBookDetails] Failed to meet conditions for displaying book details.');
            console.error(`[displayBookDetails] Details: bookId=${bookId} (is NaN: ${isNaN(bookId)}), booksData defined: ${!!booksData}, booksData length: ${booksData ? booksData.length : 'N/A'}`);

            const detailsSection = document.getElementById('book-details');
            if (detailsSection) {
                detailsSection.innerHTML = `
                        <div class="text-center py-5">
                            <h2>No Book Selected</h2>
                            <p class="lead">It looks like you've landed here without choosing a specific book.</p>
                            <p>Please select a book from our <a href="index.html" class="btn btn-primary">Homepage</a> to see its details, or ensure you have an <code>?id=X</code> parameter in the URL if you're testing.</p>
                        </div>`;
            }
        }
    }

    // Function to display genres on genres.html
    function displayGenres() {
        const genreGrid = document.getElementById('genre-grid');
        if (!genreGrid || !booksData) {
            console.error("Genre grid element or booksData not found for displayGenres.");
            if (genreGrid) genreGrid.innerHTML = "<p class='text-center text-danger col-12'>Could not load genres at this time.</p>";
            return;
        }

        const genreIcons = {
            "Contemporary Fiction": "fas fa-book-open-reader",
            "Self-Help": "fas fa-hands-helping",
            "Mystery": "fas fa-user-secret",
            "Thriller": "fas fa-bolt",
            "Science Fiction": "fas fa-rocket",
            "Romance": "fas fa-heart",
            "Historical Fiction": "fas fa-landmark",
            "Fantasy": "fas fa-dragon",
            "Adventure": "fas fa-map-signs", // New icon for Adventure
            "Humor": "fas fa-smile-beam",    // New icon for Humor
            "Historical Non-Fiction": "fas fa-scroll", // New icon for Historical Non-Fiction
            "Default": "fas fa-book"
        };

        const uniqueGenres = [...new Set(booksData.map(book => book.genre))].sort();

        if (uniqueGenres.length === 0) {
            genreGrid.innerHTML = "<p class='text-center text-muted col-12'>No genres available at the moment.</p>";
            return;
        }

        genreGrid.innerHTML = '';
        uniqueGenres.forEach(genre => {
            const genreCardCol = document.createElement('div');
            genreCardCol.className = 'col';
            const iconClass = genreIcons[genre] || genreIcons["Default"];
            genreCardCol.innerHTML = `
                    <a href="genre-books.html?genre=${encodeURIComponent(genre)}" class="text-decoration-none">
                        <div class="genre-card-item card h-100 text-center">
                            <div class="card-body d-flex flex-column justify-content-center align-items-center p-3">
                                <i class="${iconClass} fa-2x mb-3"></i>
                                <h5 class="card-title mb-0">${genre}</h5>
                            </div>
                        </div>
                    </a>
                `;
            genreGrid.appendChild(genreCardCol);
        });
    }

    // Function to display books for a specific genre on genre-books.html
    function displayGenreSpecificBooks() {
        const urlParams = new URLSearchParams(window.location.search);
        const genreName = urlParams.get('genre');
        const genreBooksGrid = document.getElementById('genre-books-grid');
        const genrePageTitleElement = document.getElementById('genre-page-title');

        if (!genreName || !genreBooksGrid || !genrePageTitleElement) {
            console.error("Required elements or genre name not found for displayGenreSpecificBooks.");
            if (genreBooksGrid) genreBooksGrid.innerHTML = "<p class='text-center text-danger col-12'>Could not load books for this genre.</p>";
            if (genrePageTitleElement) genrePageTitleElement.textContent = "Genre Not Found";
            document.title = "Genre Not Found - BookVibe";
            return;
        }

        const formattedGenreName = decodeURIComponent(genreName);
        let displayGenreName = formattedGenreName;
        const lowerGenreName = formattedGenreName.toLowerCase();

        if (!lowerGenreName.includes("fiction") && !lowerGenreName.includes("genre")) {
            displayGenreName += " Genre";
        }

        genrePageTitleElement.innerHTML = `Books in <span class="highlight-text">${displayGenreName}</span>`;
        document.title = `${displayGenreName} Books - BookVibe`;

        const booksInGenre = booksData.filter(book => book.genre.toLowerCase() === formattedGenreName.toLowerCase());

        genreBooksGrid.innerHTML = '';

        if (booksInGenre.length === 0) {
            genreBooksGrid.innerHTML = `<p class="text-center text-muted col-12">No books found in the "${formattedGenreName}" genre yet. Check back soon!</p>`;
            return;
        }

        booksInGenre.forEach(book => {
            const bookCardCol = document.createElement('div');
            bookCardCol.className = 'col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-4';
            bookCardCol.innerHTML = `
                    <div class="book-card h-100">
                        <img src="${book.image}" alt="Cover of ${book.title}" class="card-img-top">
                        <div class="book-info">
                            <h3>${book.title}</h3>
                            <p>${book.author}</p>
                            <p class="book-price">₹${Math.round(book.price)}</p>
                            <div class="d-flex justify-content-between align-items-center mt-auto">
                                <a href="book-details.html?id=${book.id}" class="btn btn-primary">Explore <i class="fas fa-arrow-right ms-1"></i></a>
                                <button class="btn wishlist-btn wishlist-btn-card" data-book-id="${book.id}" title="Add to Wishlist">
                                    <i class="fas fa-heart"></i> <!-- Always fas fa-heart -->
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            genreBooksGrid.appendChild(bookCardCol);
        });
        // Add event listeners to newly created wishlist buttons on cards
        addWishlistButtonListeners(genreBooksGrid);
    }

    // Function to display books for a specific mood on mood-books.html
    function displayMoodSpecificBooks() {
        const urlParams = new URLSearchParams(window.location.search);
        const moodName = urlParams.get('mood');
        const moodBooksGrid = document.getElementById('mood-books-grid');
        const moodPageTitleElement = document.getElementById('mood-page-title');

        if (!moodName || !moodBooksGrid || !moodPageTitleElement) {
            console.error("Required elements or mood name not found for displayMoodSpecificBooks.");
            if (moodBooksGrid) moodBooksGrid.innerHTML = "<p class='text-center text-danger col-12'>Could not load books for this mood.</p>";
            if (moodPageTitleElement) moodPageTitleElement.textContent = "Mood Not Found";
            document.title = "Mood Not Found - BookVibe";
            return;
        }

        const formattedMoodName = decodeURIComponent(moodName);
        let article = "a";
        const firstLetter = formattedMoodName.charAt(0).toLowerCase();
        if (['a', 'e', 'i', 'o', 'u'].includes(firstLetter)) {
            article = "an";
        }

        moodPageTitleElement.innerHTML = `Books for ${article} <span class="highlight-text">${formattedMoodName}</span> Vibe`;
        document.title = `Books for ${article} ${formattedMoodName} Vibe - BookVibe`;

        const booksForMood = booksData.filter(book =>
            book.moods && book.moods.some(m => m.toLowerCase() === formattedMoodName.toLowerCase())
        );

        moodBooksGrid.innerHTML = '';

        if (booksForMood.length === 0) {
            moodBooksGrid.innerHTML = `<p class="text-center text-muted col-12">No books found for the "${formattedMoodName}" vibe yet. Explore other moods!</p>`;
            return;
        }

        booksForMood.forEach(book => {
            const bookCardCol = document.createElement('div');
            bookCardCol.className = 'col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-4';
            bookCardCol.innerHTML = `
                    <div class="book-card h-100">
                        <img src="${book.image}" alt="Cover of ${book.title}" class="card-img-top">
                        <div class="book-info">
                            <h3>${book.title}</h3>
                            <p>${book.author}</p>
                            <p class="book-price">₹${Math.round(book.price)}</p>
                            <div class="d-flex justify-content-between align-items-center mt-auto">
                                <a href="book-details.html?id=${book.id}" class="btn btn-primary">Explore <i class="fas fa-arrow-right ms-1"></i></a>
                                <button class="btn wishlist-btn wishlist-btn-card" data-book-id="${book.id}" title="Add to Wishlist">
                                    <i class="fas fa-heart"></i> <!-- Always fas fa-heart -->
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            moodBooksGrid.appendChild(bookCardCol);
        });
        // Add event listeners to newly created wishlist buttons on cards
        addWishlistButtonListeners(moodBooksGrid);
    }

    // Function to display search results on search-results.html
    function displaySearchResultsPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('query');
        const searchResultsGrid = document.getElementById('search-results-grid');
        const searchPageTitleElement = document.getElementById('search-page-title');

        if (!searchResultsGrid || !searchPageTitleElement) { // searchQuery can be null/empty, handled below
            console.error("Required DOM elements not found for displaySearchResultsPage.");
            if (searchResultsGrid) searchResultsGrid.innerHTML = "<p class='text-center text-danger col-12'>Could not display search results due to a page error.</p>";
            if (searchPageTitleElement) searchPageTitleElement.textContent = "Search Error";
            document.title = "Search Error - BookVibe";
            return;
        }

        const formattedQuery = searchQuery ? decodeURIComponent(searchQuery).trim() : "";

        if (!formattedQuery) {
            searchPageTitleElement.textContent = "Search BookVibe";
            document.title = "Search - BookVibe";
            searchResultsGrid.innerHTML = `<p class="text-center text-muted col-12">Please enter a keyword or phrase to search for books.</p>`;
            return;
        }

        searchPageTitleElement.innerHTML = `Search Results for "<span class="highlight-text">${formattedQuery}</span>"`;
        document.title = `Search Results for "${formattedQuery}" - BookVibe`;

        const searchWords = formattedQuery.toLowerCase().split(' ').filter(word => word.length > 0);

        const results = booksData.filter(book => {
            const titleLower = book.title.toLowerCase();
            const authorLower = book.author.toLowerCase();

            // Check if all search words are in the title OR all search words are in the author
            const titleMatches = searchWords.every(word => titleLower.includes(word));
            const authorMatches = searchWords.every(word => authorLower.includes(word));

            return titleMatches || authorMatches;
        });

        searchResultsGrid.innerHTML = ''; // Clear placeholders

        if (results.length === 0) {
            searchResultsGrid.innerHTML = `<p class="text-center text-muted col-12">No books found matching your search for "<span class="fw-bold">${formattedQuery}</span>". Try a different term!</p>`;
            return;
        }

        results.forEach(book => {
            const bookCardCol = document.createElement('div');
            bookCardCol.className = 'col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-4';
            bookCardCol.innerHTML = `
                    <div class="book-card h-100">
                        <img src="${book.image}" alt="Cover of ${book.title}" class="card-img-top">
                        <div class="book-info">
                            <h3>${book.title}</h3>
                            <p>${book.author}</p>
                            <p class="book-price">₹${Math.round(book.price)}</p>
                            <div class="d-flex justify-content-between align-items-center mt-auto">
                                <a href="book-details.html?id=${book.id}" class="btn btn-primary">Explore <i class="fas fa-arrow-right ms-1"></i></a>
                                <button class="btn wishlist-btn wishlist-btn-card" data-book-id="${book.id}" title="Add to Wishlist">
                                    <i class="fas fa-heart"></i> <!-- Always fas fa-heart -->
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            searchResultsGrid.appendChild(bookCardCol);
        });
        // Add event listeners to newly created wishlist buttons on cards
        addWishlistButtonListeners(searchResultsGrid);
    }

    // Function to populate featured books, potentially filtered by genre
    function populateFeaturedBooks(filterGenre = null, searchQuery = null) {
        const featuredBooksSection = document.getElementById('featured-books');
        const carouselElement = document.getElementById('featuredBooksCarousel');
        const carouselInner = carouselElement ? carouselElement.querySelector('.carousel-inner') : null;
        const sectionTitleElement = featuredBooksSection ? featuredBooksSection.querySelector('h2') : null;

        let booksToDisplay = booksData;
        let sectionTitle = "Bestsellers & Trending Now";

        if (!featuredBooksSection) return;

        // This function is primarily for the homepage carousel.
        // Search results are now handled by search-results.html.
        // Genre specific pages are handled by genre-books.html.
        // We keep the searchQuery logic here in case someone manually navigates to index.html?search=...
        // but the main search form redirects to search-results.html.

        if (searchQuery) {
            // If a search query is present (e.g., from a direct URL like index.html?search=query),
            // filter the books and display them as a grid, hiding the carousel.
            booksToDisplay = booksData.filter(book => // Filter from all booksData
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author.toLowerCase().includes(searchQuery.toLowerCase())
            );
            if (sectionTitleElement) {
                sectionTitle = `Search Results for "${searchQuery}"`;
            }
        } else if (filterGenre) {
            // This case is less likely now with dedicated genre pages, but kept for robustness
            booksToDisplay = booksData.filter(book => book.genre.toLowerCase() === filterGenre.toLowerCase());
            if (sectionTitleElement) {
                sectionTitle = `Books in "${filterGenre}"`;
            }
        }


        if (sectionTitleElement) {
            sectionTitleElement.textContent = sectionTitle;
        }

        // If it's a search result (from direct URL) or a genre filter (legacy), display as grid.
        if (searchQuery || filterGenre) {
            let gridHTML = '<div class="row justify-content-center">';
            if (booksToDisplay.length === 0) {
                let message = "No books found.";
                if (searchQuery) message = `No books found for your search: "${searchQuery}".`;
                else if (filterGenre) message = `No books found for "${filterGenre}".`;
                gridHTML = `<p class="text-center text-muted col-12">${message}</p>`;
            } else {
                booksToDisplay.forEach(book => {
                    gridHTML += `
                            <div class="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-4">
                                <div class="book-card h-100">
                                    <img src="${book.image}" alt="Cover of ${book.title}" class="card-img-top">
                                    <div class="book-info">
                                        <h3>${book.title}</h3>
                                        <p>${book.author}</p>
                                        <p class="book-price">₹${Math.round(book.price)}</p>
                                        <div class="d-flex justify-content-between align-items-center mt-auto">
                                            <a href="book-details.html?id=${book.id}" class="btn btn-primary">Explore <i class="fas fa-arrow-right ms-1"></i></a>
                                            <button class="btn wishlist-btn wishlist-btn-card" data-book-id="${book.id}" title="Add to Wishlist">
                                                <i class="fas fa-heart"></i> <!-- Always fas fa-heart -->
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                });
            }
            gridHTML += '</div>';

            if (carouselElement) carouselElement.style.display = 'none';

            let gridContainer = featuredBooksSection.querySelector('.books-grid-container');
            if (!gridContainer) {
                gridContainer = document.createElement('div');
                gridContainer.className = 'container books-grid-container pt-3';
                if (sectionTitleElement && sectionTitleElement.nextSibling) {
                    sectionTitleElement.parentNode.insertBefore(gridContainer, sectionTitleElement.nextSibling);
                } else if (sectionTitleElement) {
                    sectionTitleElement.parentNode.appendChild(gridContainer);
                } else {
                    featuredBooksSection.prepend(gridContainer);
                }
            }
            gridContainer.innerHTML = gridHTML;
            // Add event listeners to newly created wishlist buttons on cards
            addWishlistButtonListeners(gridContainer);
            return; // Exit after displaying grid for search/filter
        }

        // Default: Populate original carousel structure if no filter and carousel exists
        if (carouselElement && carouselInner) {
            carouselElement.style.display = 'block'; // Ensure carousel is visible
            let gridContainer = featuredBooksSection.querySelector('.books-grid-container');
            if (gridContainer) gridContainer.innerHTML = ''; // Clear any existing grid

            carouselInner.innerHTML = ''; // Clear previous items

            const booksPerSlide = 6; // Increased from 4 to 6
            for (let i = 0; i < booksToDisplay.length; i += booksPerSlide) {
                const slideBooks = booksToDisplay.slice(i, i + booksPerSlide);
                const carouselItemDiv = document.createElement('div');
                carouselItemDiv.className = 'carousel-item' + (i === 0 ? ' active' : '');

                let rowHTML = '<div class="row justify-content-center">';
                slideBooks.forEach(book => {
                    // Adjusted column classes for better responsiveness with 6 items per slide
                    const colClasses = "col-12 col-sm-6 col-md-3 col-lg-2 mb-4";
                    rowHTML += `
                            <div class="${colClasses}">
                                <div class="book-card h-100">
                                    <img src="${book.image}" alt="Cover of ${book.title}" class="card-img-top">
                                    <div class="book-info">
                                        <h3>${book.title}</h3>
                                        <p>${book.author}</p>
                                        <p class="book-price">₹${Math.round(book.price)}</p>
                                        <div class="d-flex justify-content-between align-items-center mt-auto">
                                            <a href="book-details.html?id=${book.id}" class="btn btn-primary">Explore <i class="fas fa-arrow-right ms-1"></i></a>
                                            <button class="btn wishlist-btn wishlist-btn-card" data-book-id="${book.id}" title="Add to Wishlist">
                                                <i class="fas fa-heart"></i> <!-- Always fas fa-heart -->
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                });
                rowHTML += '</div>';
                carouselItemDiv.innerHTML = rowHTML;
                carouselInner.appendChild(carouselItemDiv);
            }

            const prevButton = carouselElement.querySelector('.carousel-control-prev');
            const nextButton = carouselElement.querySelector('.carousel-control-next');
            if (booksToDisplay.length <= booksPerSlide) {
                if (prevButton) prevButton.style.display = 'none';
                if (nextButton) nextButton.style.display = 'none';
            } else {
                if (prevButton) prevButton.style.display = 'block';
                if (nextButton) nextButton.style.display = 'block';
            }
        } else if (carouselElement) {
            // Fallback if carouselInner is not found but carouselElement is
            carouselElement.innerHTML = "<p class='text-center text-muted col-12'>Could not load featured books carousel.</p>";
        }
        // Add event listeners to newly created wishlist buttons on cards (for carousel)
        if (carouselInner) {
            addWishlistButtonListeners(carouselInner);
        }
    }


    // Helper function to add event listeners for buttons on the wishlist page
    function addWishlistPageButtonListeners() {
        const removeButtons = document.querySelectorAll('.wishlist-remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const bookId = parseInt(this.dataset.bookId);
                toggleWishlist(bookId, this); // Pass buttonElement. Animation only triggers on add.
                displayWishlistPage(); // Re-render the wishlist page
            });
        });

        const addToCartButtons = document.querySelectorAll('.wishlist-add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function () {
                const bookId = parseInt(this.dataset.bookId);
                const book = booksData.find(b => b.id === bookId);
                if (book) addToCart(book);
            });
        });
    }
    // --- Profile Page Functionality ---

    const defaultUserProfile = {
        name: "Vibing Reader",
        email: "reader@bookvibe.com",
        bio: "A book lover on a quest for the next great read.",
        address: "", // Optional: Add to HTML if needed
        profilePictureUrl: "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png" // Generic user avatar // Default placeholder
    };

    function getUserProfile() {
        const profile = JSON.parse(localStorage.getItem('bookVibeUserProfile'));
        // Merge with defaults to ensure all fields are present if profile was saved with fewer fields
        return profile ? { ...defaultUserProfile, ...profile } : { ...defaultUserProfile };
    }

    function saveUserProfile(profileData) {
        localStorage.setItem('bookVibeUserProfile', JSON.stringify(profileData));
    }

    function displayUserProfile() {
        const profile = getUserProfile();

        // Sidebar display elements
        const profilePageNameDisplay = document.getElementById('profilePageName');
        const profilePageEmailDisplay = document.getElementById('profilePageEmail');
        const profilePagePicDisplay = document.getElementById('profilePagePic');

        // Form input elements
        const profileNameInput = document.getElementById('profileNameInput');
        const profileEmailInput = document.getElementById('profileEmailInput');
        const profileBioInput = document.getElementById('profileBioInput');
        // const profileAddressInput = document.getElementById('profileAddressInput'); // If you add an address field

        if (profilePageNameDisplay) profilePageNameDisplay.textContent = profile.name;
        if (profilePageEmailDisplay) profilePageEmailDisplay.textContent = profile.email;
        if (profilePagePicDisplay) profilePagePicDisplay.src = profile.profilePictureUrl;

        if (profileNameInput) profileNameInput.value = profile.name;
        if (profileEmailInput) profileEmailInput.value = profile.email;
        if (profileBioInput) profileBioInput.value = profile.bio;
        // if (profileAddressInput) profileAddressInput.value = profile.address;

        // Optional: Update username in navbar if an element with id="navbarUsername" exists
        const navbarUsername = document.getElementById('navbarUsername');
        if (navbarUsername) {
            navbarUsername.textContent = profile.name;
        }
    }

    function handleProfileFormSubmit(event) {
        event.preventDefault();
        const saveButton = event.target.querySelector('button[type="submit"]');
        const btnText = saveButton ? saveButton.querySelector('.btn-text') : null;
        const spinnerIcon = saveButton ? saveButton.querySelector('.fa-spinner') : null;
        const tickIcon = saveButton ? saveButton.querySelector('.fa-check-circle') : null;

        if (btnText) btnText.textContent = 'Saving...';
        if (spinnerIcon) spinnerIcon.classList.remove('d-none');
        if (tickIcon) tickIcon.classList.add('d-none');
        if (saveButton) saveButton.disabled = true;

        // Simulate async operation
        setTimeout(() => {
            const currentProfile = getUserProfile(); // Get current profile to preserve picture if not changed
            const newProfileData = {
                ...currentProfile, // Preserve existing data like profilePictureUrl
                name: document.getElementById('profileNameInput').value,
                email: document.getElementById('profileEmailInput').value,
                bio: document.getElementById('profileBioInput').value,
                // address: document.getElementById('profileAddressInput') ? document.getElementById('profileAddressInput').value : currentProfile.address,
            };

            saveUserProfile(newProfileData);
            displayUserProfile(); // Refresh displayed data

            if (btnText) btnText.textContent = 'Save Changes';
            if (spinnerIcon) spinnerIcon.classList.add('d-none');
            if (tickIcon) tickIcon.classList.remove('d-none');
            if (saveButton) saveButton.disabled = false;

            showToast("Profile updated successfully!", "success"); // Re-use existing toast

            // Hide tick icon after a short delay
            setTimeout(() => {
                if (tickIcon) tickIcon.classList.add('d-none');
            }, 2000);

        }, 1000); // Simulate network delay
    }

    function handleProfilePictureChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const profilePagePicDisplay = document.getElementById('profilePagePic');
                if (profilePagePicDisplay) {
                    profilePagePicDisplay.src = e.target.result;
                }
                // Save the new picture to profile
                const profile = getUserProfile();
                profile.profilePictureUrl = e.target.result; // Store as Base64
                saveUserProfile(profile);
                showToast("Profile picture updated!", "success");
            }
            reader.readAsDataURL(file);
        }
    }

    function handleLogout() {
        // Basic logout: clear local storage and redirect to home.
        // In a real app, this would involve backend calls to invalidate sessions.
        localStorage.removeItem('bookVibeUserProfile'); // Clear profile
        // Potentially clear cart, wishlist etc. if user session is fully ended
        // localStorage.removeItem('bookVibeCart');
        // localStorage.removeItem('bookVibeWishlist');
        showToast("You have been logged out.", "info");
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }

    function handleSettingsFormSubmit(event) {
        event.preventDefault();
        const saveButton = event.target.querySelector('button[type="submit"]');
        const btnText = saveButton ? saveButton.querySelector('.btn-text') : null;
        const spinnerIcon = saveButton ? saveButton.querySelector('.fa-spinner') : null;
        const tickIcon = saveButton ? saveButton.querySelector('.fa-check-circle') : null;

        if (!saveButton || !btnText || !spinnerIcon || !tickIcon) {
            console.error("Could not find all required elements on the settings save button.");
            return;
        }

        btnText.textContent = 'Saving...';
        spinnerIcon.classList.remove('d-none');
        tickIcon.classList.add('d-none');
        saveButton.disabled = true;

        // Simulate async operation
        setTimeout(() => {
            // In a real app, you would collect and save the settings data here.
            btnText.textContent = 'Save Settings';
            spinnerIcon.classList.add('d-none');
            tickIcon.classList.remove('d-none');
            saveButton.disabled = false;

            showToast("Settings saved successfully!", "success");

            // Hide tick icon after a short delay
            setTimeout(() => {
                tickIcon.classList.add('d-none');
            }, 2000);
        }, 1500); // Simulate a slightly longer network delay
    }

    function animateVibeStats() {
        const statsContainer = document.getElementById('my-vibes');
        if (!statsContainer) {
            console.warn("Vibe Stats container not found for animation.");
            return;
        }

        // --- LOGIC CORRECTION ---
        // Dynamically set the target for wishlisted items based on the actual wishlist length.
        const wishlistStatCounter = document.getElementById('wishlistStatValue');
        if (wishlistStatCounter) {
            // The global 'wishlist' variable is defined at the top of script.js
            wishlistStatCounter.dataset.target = wishlist.length;
        }
        // --- END LOGIC CORRECTION ---

        const counters = statsContainer.querySelectorAll('.stat-value[data-target]');
        const animationDuration = 1500; // Total duration in ms

        counters.forEach(counter => {
            // Prevent re-animating if it's already running.
            if (counter.isAnimating) return;
            counter.isAnimating = true;

            counter.innerText = '0'; // Reset before animation
            const target = +counter.dataset.target;
            if (isNaN(target)) {
                counter.isAnimating = false;
                return; // Skip if target is not a number
            }

            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / animationDuration, 1);
                const currentValue = Math.floor(progress * target);
                counter.innerText = currentValue;

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    counter.innerText = target; // Ensure it ends on the exact target value
                    counter.isAnimating = false; // Animation finished
                }
            };
            window.requestAnimationFrame(step);
        });
    }
    // --- End Profile Page Functionality ---

    // --- Cart Page Functionality ---
    function displayCartPage() {
        const cartContent = document.getElementById('cart-content');
        const emptyCartMessage = document.getElementById('empty-cart-message');

        if (!cartContent || !emptyCartMessage) {
            return; // Not on the cart page
        }

        if (cart.length === 0) {
            cartContent.innerHTML = ''; // Clear any existing content
            cartContent.classList.add('d-none');
            emptyCartMessage.classList.remove('d-none');
        } else {
            emptyCartMessage.classList.add('d-none');
            cartContent.classList.remove('d-none');

            let subtotal = 0;
            cart.forEach(item => {
                subtotal += item.price * item.quantity;
            });

            cartContent.innerHTML = `
                    <div class="row">
                        <!-- Cart Items List -->
                        <div class="col-lg-8 mb-4 mb-lg-0">
                            <div class="card shadow-sm cart-items-card">
                                <div class="card-header bg-white py-3">
                                    <h5 class="mb-0">Cart Items (${cart.reduce((sum, item) => sum + item.quantity, 0)})</h5>
                                </div>
                                <div class="card-body p-0">
                                    <ul class="list-group list-group-flush">
                                        ${cart.map(item => `
                                            <li class="list-group-item px-3 py-3">
                                                <div class="row align-items-center">
                                                    <div class="col-2 col-md-2">
                                                        <a href="book-details.html?id=${item.id}">
                                                            <img src="${item.image}" alt="${item.title}" class="img-fluid rounded cart-page-item-img">
                                                        </a>
                                                    </div>
                                                    <div class="col-5 col-md-5">
                                                        <a href="book-details.html?id=${item.id}" class="text-dark fw-bold text-decoration-none cart-item-title-link">${item.title}</a>
                                                        <p class="text-muted small mb-0">by ${item.author}</p>
                                                        <p class="text-primary-cyan small mb-0">₹${Math.round(item.price)}</p>
                                                    </div>
                                                    <div class="col-3 col-md-3">
                                                        <div class="input-group input-group-sm cart-quantity-controls">
                                                            <button class="btn btn-outline-secondary decrease-quantity-btn" type="button" data-book-id="${item.id}"><i class="fas fa-minus"></i></button>
                                                            <input type="text" class="form-control text-center cart-item-quantity" value="${item.quantity}" readonly>
                                                            <button class="btn btn-outline-secondary increase-quantity-btn" type="button" data-book-id="${item.id}"><i class="fas fa-plus"></i></button>
                                                        </div>
                                                    </div>
                                                    <div class="col-2 col-md-2 text-end">
                                                        <span class="fw-bold d-block mb-2">₹${Math.round(item.price * item.quantity)}</span>
                                                        <a href="#" class="remove-from-cart-link text-danger" data-book-id="${item.id}" title="Remove item"><i class="fas fa-trash"></i></a>
                                                    </div>
                                                </div>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
        
                        <!-- Order Summary -->
                        <div class="col-lg-4">
                            <div class="card shadow-sm summary-card">
                                <div class="card-header bg-white py-3">
                                    <h5 class="mb-0">Order Summary</h5>
                                </div>
                                <div class="card-body">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                            Subtotal
                                            <span>₹${Math.round(subtotal)}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                            Shipping
                                            <span class="text-success">FREE</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center fw-bold px-0 border-top pt-3 mt-2">
                                            Total
                                            <span>₹${Math.round(subtotal)}</span>
                                        </li>
                                    </ul>
                                    <a href="checkout.html" class="btn btn-primary w-100 mt-4">Proceed to Checkout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

            // Add event listeners after rendering
            addCartPageEventListeners();
        }
    }

    function addCartPageEventListeners() {
        document.querySelectorAll('.increase-quantity-btn').forEach(button => {
            button.addEventListener('click', function () {
                const bookId = parseInt(this.dataset.bookId);
                const item = cart.find(i => i.id === bookId);
                if (item) {
                    item.quantity++;
                    saveCart();
                    updateCartCount();
                    displayCartPage();
                }
            });
        });

        document.querySelectorAll('.decrease-quantity-btn').forEach(button => {
            button.addEventListener('click', function () {
                const bookId = parseInt(this.dataset.bookId);
                const item = cart.find(i => i.id === bookId);
                if (item && item.quantity > 1) {
                    item.quantity--;
                    saveCart();
                    updateCartCount();
                    displayCartPage();
                } else if (item && item.quantity === 1) {
                    // If quantity is 1, decreasing should remove it. Confirm first.
                    if (confirm(`Remove "${item.title}" from your cart?`)) {
                        cart = cart.filter(i => i.id !== bookId);
                        saveCart();
                        updateCartCount();
                        displayCartPage();
                        showToast(`${item.title} removed from cart.`, 'info');
                    }
                }
            });
        });

        document.querySelectorAll('.remove-from-cart-link').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const bookId = parseInt(this.dataset.bookId);
                const item = cart.find(i => i.id === bookId);
                if (item) {
                    if (confirm(`Are you sure you want to remove "${item.title}" from your cart?`)) {
                        cart = cart.filter(i => i.id !== bookId);
                        saveCart();
                        updateCartCount();
                        displayCartPage();
                        showToast(`${item.title} removed from cart.`, 'info');
                    }
                }
            });
        });
    }

    // --- Order History Functionality ---
    function displayOrderHistory() {
        const accordionContainer = document.getElementById('orderHistoryAccordion');
        const noOrdersMessage = document.getElementById('no-orders-message');

        if (!accordionContainer || !noOrdersMessage) {
            // This might run on pages other than profile.html, so no error needed if elements aren't there.
            return;
        }

        // `orders` is the global variable loaded from localStorage
        if (orders && orders.length > 0) {
            noOrdersMessage.classList.add('d-none');
            accordionContainer.classList.remove('d-none');
            accordionContainer.innerHTML = ''; // Clear previous content

            orders.forEach((order, index) => {
                const orderDate = new Date(order.date).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                });
                const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

                const accordionItem = document.createElement('div');
                accordionItem.className = 'accordion-item mb-3 shadow-sm'; // Added shadow for depth
                accordionItem.innerHTML = `
                        <h2 class="accordion-header" id="heading-${order.id}">
                            <button class="accordion-button ${index > 0 ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${order.id}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="collapse-${order.id}">
                                <div class="d-flex flex-wrap justify-content-between w-100 pe-3 gap-2">
                                    <span class="order-header-item"><strong>Order ID:</strong> ${order.id}</span>
                                    <span class="order-header-item"><strong>Date:</strong> ${orderDate}</span>
                                    <span class="order-header-item"><strong>Total:</strong> ₹${Math.round(order.total)}</span>
                                </div>
                            </button>
                        </h2>
                        <div id="collapse-${order.id}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="heading-${order.id}" data-bs-parent="#orderHistoryAccordion">
                            <div class="accordion-body">
                                <h6 class="mb-3">Order Details (${totalItems} ${totalItems > 1 ? 'items' : 'item'})</h6>
                                <ul class="list-group list-group-flush">
                                    ${order.items.map(item => `
                                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <div class="me-3 mb-2 mb-md-0">
                                                <a href="book-details.html?id=${item.id}" class="text-dark fw-bold text-decoration-none order-item-title">${item.title}</a>
                                                <small class="d-block text-muted">by ${item.author}</small>
                                            </div>
                                            <div class="d-flex gap-3">
                                                <span>Qty: ${item.quantity}</span>
                                                <span class="fw-bold">₹${Math.round(item.price * item.quantity)}</span>
                                            </div>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    `;
                accordionContainer.appendChild(accordionItem);
            });
        } else {
            // No orders found
            noOrdersMessage.classList.remove('d-none');
            accordionContainer.classList.add('d-none');
            accordionContainer.innerHTML = '';
        }
    }

    // --- Vibe of the Week (Spotlight) Functionality ---
    function populateVibeSpotlight() {
        const spotlightBookId = 10; // ID of the book designated for "Vibe of the Week"
        const spotlightBook = booksData.find(book => book.id === spotlightBookId);

        const titleElement = document.getElementById('spotlight-title');
        const descriptionElement = document.getElementById('spotlight-description');
        const imageElement = document.getElementById('spotlight-image');
        const shopButtonElement = document.getElementById('spotlightShopBtn');

        if (spotlightBook && titleElement && descriptionElement && imageElement && shopButtonElement) {
            titleElement.textContent = spotlightBook.title;
            // The description from booksData can be long.
            // For the spotlight, you might want a shorter, more curated description.
            // For now, we'll use the full description.
            // If you want to show only the first paragraph or a specific summary,
            // you might need to add a new field to your book object like `spotlightSummary`.
            descriptionElement.textContent = spotlightBook.description.split('\n')[0]; // Displaying only the first line/paragraph for brevity

            imageElement.src = spotlightBook.image;
            imageElement.alt = `Cover of ${spotlightBook.title}`;
            shopButtonElement.dataset.bookId = spotlightBook.id;
        } else {
            console.warn("Could not populate Vibe Spotlight. Book or DOM elements missing.");
            // Optionally hide the section or show a fallback if elements are missing
            const vibeSpotlightSection = document.querySelector('.vibe-spotlight');
            if (vibeSpotlightSection) vibeSpotlightSection.style.display = 'none';
        }
    }

    // Function to display a random book on the surprise.html page
    function displayRandomBook() {
        const randomBookContainer = document.getElementById('random-book-display');

        if (!randomBookContainer || !booksData || booksData.length === 0) {
            console.error("Required elements or booksData not found for displayRandomBook.");
            if (randomBookContainer) randomBookContainer.innerHTML = "<p class='text-center text-danger'>Could not load a surprise book at this time.</p>";
            return;
        }

        // Add animation class to hide and prepare for new content
        randomBookContainer.classList.add('book-fade-out');

        setTimeout(() => { // Wait for fade-out animation to complete
            const randomIndex = Math.floor(Math.random() * booksData.length);
            const book = booksData[randomIndex];

            // Clear previous content and inject new book details
            randomBookContainer.innerHTML = `
                    <div class="row align-items-center justify-content-center">
                        <div class="col-md-4 text-center mb-4 mb-md-0 position-relative">
                            <img src="${book.image}" alt="Cover of ${book.title}" class="img-fluid rounded shadow-lg surprise-book-cover" id="surprise-book-image">
                        </div>
                        <div class="col-md-6 text-md-start text-center">
                            <h2 class="surprise-book-title">${book.title}</h2>
                            <p class="surprise-book-author text-muted">by ${book.author}</p>
                            <p class="surprise-book-description">${book.description.split('\n')[0]}</p>
                            <p class="surprise-book-price lead fw-bold">₹${Math.round(book.price)}</p>
                            <button class="btn btn-primary surprise-add-to-cart-btn" data-book-id="${book.id}">
                                <i class="fas fa-cart-plus me-2"></i>Add to Cart
                            </button>
                            <a href="book-details.html?id=${book.id}" class="btn btn-outline-secondary ms-2">View Details</a>
                        </div>
                    </div>
                `;

            // Attach event listeners for the new buttons
            const addToCartBtn = randomBookContainer.querySelector('.surprise-add-to-cart-btn');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', () => addToCart(book));
            }

            // Remove fade-out and add fade-in class to trigger animation
            randomBookContainer.classList.remove('book-fade-out');
            randomBookContainer.classList.add('book-fade-in');
            randomBookContainer.addEventListener('animationend', () => {
                randomBookContainer.classList.remove('book-fade-in');
            }, { once: true });

        }, 300); // Match fade-out duration
    }

    // BookVibe Custom JavaScript - DOMContentLoaded ensures the DOM is ready

    // Helper function to add event listeners to wishlist buttons on cards
    function addWishlistButtonListeners(container) {
        const wishlistCardBtns = container.querySelectorAll('.wishlist-btn-card');
        wishlistCardBtns.forEach(btn => {
            btn.addEventListener('click', function (event) { // Add event parameter
                event.preventDefault(); // Prevent any default action of the button
                event.stopPropagation(); // Standard stop bubbling
                event.stopImmediatePropagation(); // Stop other listeners on this button and also stops bubbling
                const bookId = parseInt(this.dataset.bookId);
                // console.log('Wishlist button clicked on card for book ID:', bookId, 'Element:', this); // For debugging
                toggleWishlist(bookId, this); // Pass the button element
            });
        });
    }

    // New function to initialize all wishlist button states on page load
    function initializeAllWishlistButtonStates() {
        const allWishlistButtons = document.querySelectorAll('.wishlist-btn');
        allWishlistButtons.forEach(button => {
            const bookId = parseInt(button.dataset.bookId);
            if (!isNaN(bookId)) {
                // Ensure the icon structure is fas fa-heart before updating
                if (!button.querySelector('i.fas.fa-heart')) {
                    button.innerHTML = '<i class="fas fa-heart"></i>';
                }
                updateWishlistButtons(bookId); // Applies .active class and ensures correct icon display via CSS
            }
        });
    }
    document.addEventListener('DOMContentLoaded', function () {
        console.log("BookVibe JS Loaded and DOM ready!");
    });

        window.onload = function () {
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    once: true,
                });
            } else {
                console.error("AOS library was not loaded by window.onload. Animations will not work.");
            }
        };

        // Navbar shrink on scroll
        const header = document.querySelector('.main-header');
        if (header) {
            const scrollThreshold = 50; // Pixels to scroll before shrinking

            const handleScroll = () => {
                if (window.scrollY > scrollThreshold) {
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.remove('header-scrolled');
                }
            };

            window.addEventListener('scroll', handleScroll);
            handleScroll(); // Run on page load in case it's already scrolled
        }

        const moodCardLinks = document.querySelectorAll('.mood-card-link');
        if (moodCardLinks.length > 0) {
            moodCardLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const mood = this.dataset.mood;
                    if (mood) {
                        window.location.href = `mood-books.html?mood=${encodeURIComponent(mood)}`;
                    }
                });
            });
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href.length > 1 && href.startsWith('#')) {
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });

        const quotes = [
            { text: "A room without books is like a body without a soul.", cite: "Marcus Tullius Cicero" },
            { text: "The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.", cite: "Jane Austen, Northanger Abbey" },
            { text: "So many books, so little time.", cite: "Frank Zappa" },
            { text: "If you don't like to read, you haven't found the right book.", cite: "J.K. Rowling" },
            { text: "There is no friend as loyal as a book.", cite: "Ernest Hemingway" }
        ];
        const quoteTextElement = document.getElementById('bookQuote');
        const quoteCiteElement = document.getElementById('bookCite');
        const newQuoteBtn = document.getElementById('newQuoteBtn');

        if (newQuoteBtn && quoteTextElement && quoteCiteElement) {
            newQuoteBtn.addEventListener('click', function () {
                const randomIndex = Math.floor(Math.random() * quotes.length);
                const randomQuote = quotes[randomIndex];
                quoteTextElement.style.opacity = 0;
                quoteCiteElement.style.opacity = 0;
                setTimeout(() => {
                    quoteTextElement.textContent = randomQuote.text; // Remove explicit double quotes
                    quoteCiteElement.textContent = randomQuote.cite;
                    quoteTextElement.style.opacity = 1;
                    quoteCiteElement.style.opacity = 1;
                }, 300);
            });
        }

        const newsletterForm = document.getElementById('newsletterForm');
        const formMessage = document.getElementById('formMessage');
        if (newsletterForm && formMessage) {
            newsletterForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const emailInput = document.getElementById('newsletterEmail');
                if (emailInput.value && emailInput.checkValidity()) {
                    formMessage.textContent = "Thanks for subscribing! Get ready for some awesome book vibes.";
                    formMessage.className = 'mt-3 alert alert-success';
                    emailInput.value = '';
                } else {
                    formMessage.textContent = "Please enter a valid email address.";
                    formMessage.className = 'mt-3 alert alert-danger';
                }
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = 'mt-3';
                }, 5000);
            });
        }

        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const sections = Array.from(document.querySelectorAll('main section[id]'));

        function setActiveLink(activeHref = null) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const linkHref = link.getAttribute('href');
                let isMatch = false;

                if ((activeHref === 'index.html' || activeHref === '#') && (linkHref === 'index.html' || linkHref === '#')) {
                    isMatch = true;
                } else if (linkHref === activeHref) {
                    isMatch = true;
                }

                if (isMatch) {
                    link.classList.add('active');
                }
            });
        }
        function changeNavOnScroll() {
            let currentSectionId = null;
            const scrollPosition = window.pageYOffset;
            const isIndexPage = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html');

            if (isIndexPage) {
                if (sections.length > 0 && scrollPosition < (sections[0].offsetTop - 150)) {
                    const homeLink = Array.from(navLinks).find(link => link.getAttribute('href') === '#' || link.getAttribute('href') === 'index.html');
                    if (homeLink) currentSectionId = homeLink.getAttribute('href');
                } else {
                    for (let i = sections.length - 1; i >= 0; i--) {
                        const section = sections[i];
                        const sectionTop = section.offsetTop;
                        const sectionHeight = section.offsetHeight;
                        if (scrollPosition >= sectionTop - 150 && scrollPosition < sectionTop + sectionHeight - 150) {
                            currentSectionId = `#${section.getAttribute('id')}`;
                            break;
                        }
                    }
                }
                if (!currentSectionId && scrollPosition + window.innerHeight >= document.body.offsetHeight - 50) {
                    const lastSection = sections[sections.length - 1];
                    if (lastSection) {
                        currentSectionId = `#${lastSection.getAttribute('id')}`;
                    }
                }
                setActiveLink(currentSectionId);
            }
            // For non-index pages, active link is set statically below.
        }

        if (sections.length > 0 && (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html'))) {
            window.addEventListener('scroll', changeNavOnScroll);
        }

        // Initial active link setting based on current page
        if (window.location.pathname.includes('book-details.html')) {
            setActiveLink('index.html');
        } else if (window.location.pathname.includes('genres.html')) {
            setActiveLink('genres.html');
        } else if (window.location.pathname.includes('genre-books.html')) {
            setActiveLink('genres.html');
        } else if (window.location.pathname.includes('mood-books.html')) {
            setActiveLink('index.html#mood-discovery');
        } else if (window.location.pathname.includes('profile.html')) {
            setActiveLink('profile.html');
        } else if (window.location.pathname.includes('search-results.html')) {
            setActiveLink('index.html'); // Set "Home" active on search results page
        } else if (window.location.pathname.includes('wishlist.html')) {
            setActiveLink('wishlist.html'); // Set "Wishlist" active
        } else if (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html')) {
            // For index.html, rely on scroll or initial top position
            const homeLinkInitial = Array.from(navLinks).find(link => link.getAttribute('href') === '#' || link.getAttribute('href') === 'index.html');
            if (sections.length > 0 && window.pageYOffset < (sections[0]?.offsetTop - 150 || 100) && homeLinkInitial) {
                setActiveLink(homeLinkInitial.getAttribute('href'));
            } else {
                changeNavOnScroll(); // Calculate based on scroll position
            }
        }


        updateCartCount();


        orderHistoryTabTrigger.addEventListener('shown.bs.tab', function (event) {
            displayOrderHistory(); // Refresh on tab show
        });
    }
 // End of orderHistoryTabTrigger listener block

    // If page is loaded with a hash for a tab, show it.
    if (window.location.hash) {
        new bootstrap.Tab(document.querySelector(`a[href="${window.location.hash}"]`)).show();
    }

    // Initial call to update cart count on page load
    updateCartCount();

    // All other DOMContentLoaded and window.onload listeners should be outside the duplicated block.
    // The original structure had a massive duplication. I'm assuming the first block of code
    // (up to line 1047) is the correct one, and the second one (from line 1050 onwards) is the duplicate.
    // The following code is what was present after the duplication, and should be kept.

    // This section was part of the original script.js and should remain.
    // It seems to be the main initialization block for various page elements and event listeners.

    // Homepage specific initializations
    if (document.getElementById('featured-books')) {
        const urlParams = new URLSearchParams(window.location.search);
        const genreFilter = urlParams.get('genre'); // Legacy, less likely to be used
        const searchQuery = urlParams.get('search'); // For index.html?search=...

        // Prioritize search if present (e.g., index.html?search=query)
        if (searchQuery) {
            populateFeaturedBooks(null, searchQuery);
        } else {
            populateFeaturedBooks(genreFilter, null); // Default carousel or legacy genre filter
        }
    }
    if (document.getElementById('spotlight-title')) { // Check if we are on a page with the spotlight section
        populateVibeSpotlight();
    }
    if (document.getElementById('featured-author')) {
        populateFeaturedAuthor();
    }

    initializeAllWishlistButtonStates(); // Initialize states for any wishlist buttons on the current page

    const surpriseMeBtn = document.getElementById('surpriseMeBtn');
    if (surpriseMeBtn) { // This is the button in the navbar
        // Change the href to point to the new page
        surpriseMeBtn.href = 'surprise.html';

        // The click listener on the navbar button will now just navigate to the page.
        // The random book logic will be handled on the surprise.html page itself.
        surpriseMeBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'surprise.html';
        });
    }

    const heroMoodSearchForm = document.getElementById('heroMoodSearchForm');
    if (heroMoodSearchForm) {
        heroMoodSearchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const searchInput = document.getElementById('heroMoodSearchInput');
            const searchQuery = searchInput.value.trim();
            if (searchQuery) {
                // Redirect to the general search results page instead of mood-specific page
                window.location.href = `search-results.html?query=${encodeURIComponent(searchQuery)}`;
            } else {
                showToast("Please enter a book title, author, or vibe to search!", "info");
            }
        });
    }

    // Event listener for the "Shop This Book" button in the Vibe Spotlight section
    const spotlightShopBtn = document.getElementById('spotlightShopBtn');
    if (spotlightShopBtn) {
        spotlightShopBtn.addEventListener('click', function (event) {
            event.preventDefault();
            const bookId = parseInt(this.dataset.bookId);
            const book = booksData.find(b => b.id === bookId);
            if (book) {
                addToCart(book); // This function already shows a toast
                // Open the cart modal
                const cartModalElement = document.getElementById('cartModal');
                if (cartModalElement) {
                    // updateCartDisplay(); // This function doesn't exist in the provided script.
                    const bsModal = bootstrap.Modal.getInstance(cartModalElement) || new bootstrap.Modal(cartModalElement);
                    bsModal.show();
                }
            } else {
                console.error(`[SpotlightShop] Book with ID ${bookId} not found.`);
                showToast("Error: Could not process purchase for this book.", "error");
            }
        });
    }

    // Placeholder for Contact Form on contact.html
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // In a real application, you would handle form submission here (e.g., AJAX call)
            showToast("Thank you for your message! (This is a demo)", "success");
            // Optionally, clear the form
            // contactForm.reset();
        });
    }

    // Re-trigger AOS animations for the featured books carousel on slide change
    const featuredCarousel = document.getElementById('featuredBooksCarousel');
    if (featuredCarousel) {
        // Before a new slide is shown, prepare its elements for animation.
        featuredCarousel.addEventListener('slide.bs.carousel', function (event) {
            // `event.relatedTarget` is the incoming slide element.
            const incomingSlide = event.relatedTarget;
            if (incomingSlide) {
                const aosElements = incomingSlide.querySelectorAll('[data-aos]');
                aosElements.forEach(el => {
                    // By removing the 'aos-animate' class, we reset the animation state
                    // for the elements on the incoming slide. This allows them to animate again
                    // even if AOS has 'once: true' set.
                    el.classList.remove('aos-animate');
                });
            }
        });

        // After the slide transition is complete, refresh AOS.
        featuredCarousel.addEventListener('slid.bs.carousel', function () {
            // This will detect the now-visible elements (which we've just reset)
            // and trigger their animations.
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    }
    const backToTopButton = document.getElementById('backToTopBtn');
    
    if (backToTopButton) {
        const scrollThreshold = 300; // Show button after scrolling 300px
    
        const handleScroll = () => {
            if (window.scrollY > scrollThreshold) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        };
    
        const scrollToTop = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    
        window.addEventListener('scroll', handleScroll);
        backToTopButton.addEventListener('click', scrollToTop);
    }
    