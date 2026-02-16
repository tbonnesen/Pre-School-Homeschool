// ===== ROUND 3 EXPANSION =====

const artsR3 = [

  // ===== DIFFICULTY 1 (Age 3) =====

  // 1. Finger Painting Techniques
  {
    id: 'arts-finger-painting-techniques',
    title: '🖐️ Finger Painting Fun',
    instruction: 'Learn about painting with your fingers!',
    type: 'multipleChoice',
    difficulty: 1,
    data: [
      { question: 'What do you use in finger painting?', options: ['Your fingers', 'A fork', 'A spoon', 'A stick'], answer: 'Your fingers', hint: 'It is in the name!' },
      { question: 'What do you dip your fingers in?', options: ['Paint', 'Water', 'Sand', 'Glue'], answer: 'Paint', hint: 'It is colorful and wet' },
      { question: 'What can you make with a finger dot? 🔴', options: ['A circle', 'A square', 'A triangle', 'A star'], answer: 'A circle', hint: 'Your fingertip is round' },
      { question: 'How many fingers can you paint with at once?', options: ['All of them!', 'Only one', 'Only two', 'None'], answer: 'All of them!', hint: 'You have lots of fingers to use' },
      { question: 'What do you drag your finger across to make a line?', options: ['Paper', 'The floor', 'The wall', 'Your shirt'], answer: 'Paper', hint: 'We paint on this flat white thing' },
      { question: 'What shape can you make by pressing your whole hand down?', options: ['A handprint 🖐️', 'A footprint', 'A star', 'A heart'], answer: 'A handprint 🖐️', hint: 'It looks just like your hand!' },
      { question: 'What should you do after finger painting?', options: ['Wash your hands 🧼', 'Go to sleep', 'Eat lunch', 'Watch TV'], answer: 'Wash your hands 🧼', hint: 'Your hands are messy!' },
      { question: 'You can make a tree by dragging your finger up to make a...', options: ['Trunk', 'Wheel', 'Box', 'Ball'], answer: 'Trunk', hint: 'Trees have a tall brown part' },
    ]
  },

  // 2. Singing Songs
  {
    id: 'arts-singing-songs',
    title: '🎤 Singing Songs',
    instruction: 'Match the song to what it is about!',
    type: 'dragDrop',
    difficulty: 1,
    data: {
      items: [
        { id: 1, text: '🌟 Twinkle Twinkle' },
        { id: 2, text: '🐑 Baa Baa Black Sheep' },
        { id: 3, text: '🌧️ Rain Rain Go Away' },
        { id: 4, text: '🚌 Wheels on the Bus' },
        { id: 5, text: '🕷️ Itsy Bitsy Spider' },
        { id: 6, text: '🐒 Five Little Monkeys' },
        { id: 7, text: '🌈 Somewhere Over the Rainbow' },
        { id: 8, text: '🦆 Five Little Ducks' },
      ],
      targets: [
        { id: 1, text: 'A star in the sky' },
        { id: 2, text: 'A sheep with wool' },
        { id: 3, text: 'Wanting sunshine' },
        { id: 4, text: 'A big vehicle' },
        { id: 5, text: 'A tiny bug climbing' },
        { id: 6, text: 'Animals jumping on a bed' },
        { id: 7, text: 'A colorful sky' },
        { id: 8, text: 'Baby birds swimming' },
      ]
    }
  },

  // 3. Nature Art (Leaf Prints)
  {
    id: 'arts-nature-art',
    title: '🍂 Nature Art',
    instruction: 'Learn about making art with things from nature!',
    type: 'multipleChoice',
    difficulty: 1,
    data: [
      { question: 'What can you press into paint to make a leaf print? 🍃', options: ['A leaf', 'A rock', 'A stick', 'A feather'], answer: 'A leaf', hint: 'It grows on a tree and is flat' },
      { question: 'What nature item can you use to paint with?', options: ['A pinecone 🌲', 'A cloud', 'The wind', 'A puddle'], answer: 'A pinecone 🌲', hint: 'It falls from a pine tree' },
      { question: 'What color are most leaves in summer?', options: ['Green 🟢', 'Blue', 'Purple', 'Pink'], answer: 'Green 🟢', hint: 'Think of grass!' },
      { question: 'What happens when you press a painted leaf on paper?', options: ['It leaves a print!', 'It disappears', 'It flies away', 'It grows bigger'], answer: 'It leaves a print!', hint: 'The paint transfers to the paper' },
      { question: 'Which flower part can you use to stamp with?', options: ['The petals 🌸', 'The roots', 'The soil', 'The water'], answer: 'The petals 🌸', hint: 'The colorful part on top' },
      { question: 'What can you glue leaves onto to make art?', options: ['Paper', 'Air', 'Water', 'Light'], answer: 'Paper', hint: 'It is flat and white' },
      { question: 'What can you collect outside for nature art?', options: ['Sticks and stones', 'Cars and trucks', 'Books and pencils', 'Shoes and hats'], answer: 'Sticks and stones', hint: 'These are found on the ground outside' },
      { question: 'What season gives us the most colorful leaves? 🍁', options: ['Fall', 'Summer', 'Winter', 'Spring'], answer: 'Fall', hint: 'Leaves turn red, orange, and yellow' },
    ]
  },

  // 4. Stamp Art
  {
    id: 'arts-stamp-art',
    title: '🔵 Stamp Art',
    instruction: 'Learn about the shapes stamps can make!',
    type: 'flashcard',
    difficulty: 1,
    data: [
      { front: '🥔 What fruit or veggie makes a great stamp?', back: 'A potato! Cut it in half and carve a shape 🥔' },
      { front: '⭐ What happens when you press a star stamp in paint then on paper?', back: 'You get a star shape print! ⭐' },
      { front: '🧽 Can you use a sponge as a stamp?', back: 'Yes! Sponges make bumpy, fun prints 🧽' },
      { front: '🔴🔵🟡 Can you use more than one color?', back: 'Yes! Use different colors to make rainbow art 🌈' },
      { front: '🧱 What shape does a block stamp make?', back: 'A square or rectangle shape! 🟥' },
      { front: '📦 What do you need for stamp art?', back: 'A stamp, paint, and paper! 🎨' },
      { front: '🍎 What fruit cut in half looks like a star inside?', back: 'An apple! Cut it sideways to see the star ⭐🍎' },
      { front: '🫧 What can you use to stamp circles?', back: 'A toilet paper roll! The end is a circle ⭕' },
      { front: '🌽 What happens if you roll corn on paint then on paper?', back: 'You get a bumpy, textured print! 🌽' },
    ]
  },

  // 5. Paper Folding Basics
  {
    id: 'arts-paper-folding',
    title: '📄 Paper Folding Fun',
    instruction: 'Learn about folding paper to make things!',
    type: 'multipleChoice',
    difficulty: 1,
    data: [
      { question: 'What do you fold in paper folding?', options: ['Paper 📄', 'Rocks', 'Water', 'Sand'], answer: 'Paper 📄', hint: 'It is thin and flat' },
      { question: 'If you fold a square paper in half, what shape do you get?', options: ['A rectangle', 'A circle', 'A triangle', 'A star'], answer: 'A rectangle', hint: 'It is a long shape' },
      { question: 'What animal can you fold from paper? 🐦', options: ['A bird', 'An elephant', 'A whale', 'A horse'], answer: 'A bird', hint: 'It has wings and can fly' },
      { question: 'If you fold a paper corner to corner, what shape do you get?', options: ['A triangle 🔺', 'A circle', 'A square', 'A star'], answer: 'A triangle 🔺', hint: 'It has three sides and three points' },
      { question: 'What is Japanese paper folding called?', options: ['Origami', 'Sushi', 'Karate', 'Kimono'], answer: 'Origami', hint: 'It starts with the letter O' },
      { question: 'What do you make when you fold a paper back and forth?', options: ['A fan', 'A hat', 'A boat', 'A cup'], answer: 'A fan', hint: 'You wave it to cool down' },
      { question: 'What can you make by folding a paper into a point at the front?', options: ['A paper airplane ✈️', 'A paper ball', 'A paper house', 'A paper tree'], answer: 'A paper airplane ✈️', hint: 'It flies through the air!' },
      { question: 'What simple thing can you fold from newspaper?', options: ['A hat 🎩', 'A car', 'A TV', 'A phone'], answer: 'A hat 🎩', hint: 'You wear it on your head' },
    ]
  },

  // ===== DIFFICULTY 2 (Age 4) =====

  // 6. Tie-Dye Basics
  {
    id: 'arts-tie-dye-basics',
    title: '🌀 Tie-Dye Basics',
    instruction: 'Learn about the colorful art of tie-dye!',
    type: 'multipleChoice',
    difficulty: 2,
    data: [
      { question: 'What do you do first in tie-dye?', options: ['Twist and tie the fabric', 'Cut the fabric', 'Throw the fabric', 'Iron the fabric'], answer: 'Twist and tie the fabric', hint: 'The name tells you: tie then dye!' },
      { question: 'What makes the white pattern in tie-dye?', options: ['The rubber bands 🔵', 'The water', 'The scissors', 'The sun'], answer: 'The rubber bands 🔵', hint: 'They block the dye from reaching the fabric' },
      { question: 'What shape do you get when you twist from the center?', options: ['A spiral 🌀', 'A square', 'A triangle', 'A straight line'], answer: 'A spiral 🌀', hint: 'Think of a swirly lollipop' },
      { question: 'What do you add to the tied fabric?', options: ['Colorful dye 🎨', 'Glitter', 'Stickers', 'Crayons'], answer: 'Colorful dye 🎨', hint: 'It is a liquid color' },
      { question: 'How many colors can you use in tie-dye?', options: ['As many as you want! 🌈', 'Only one', 'Only two', 'Only three'], answer: 'As many as you want! 🌈', hint: 'The more the merrier!' },
      { question: 'What item do people usually tie-dye?', options: ['A t-shirt 👕', 'A book', 'A toy car', 'A plate'], answer: 'A t-shirt 👕', hint: 'You wear it!' },
      { question: 'What do you need to wait for after adding dye?', options: ['For the colors to soak in ⏰', 'For it to freeze', 'For it to float', 'For it to shrink'], answer: 'For the colors to soak in ⏰', hint: 'Patience makes the colors bright' },
      { question: 'Will two tie-dye shirts ever look exactly the same?', options: ['No, each one is unique!', 'Yes always', 'Only if you try hard', 'Only on Tuesdays'], answer: 'No, each one is unique!', hint: 'Every tie-dye creation is one of a kind' },
      { question: 'What happens when yellow dye meets blue dye?', options: ['You get green! 💚', 'You get red', 'You get white', 'Nothing happens'], answer: 'You get green! 💚', hint: 'These two primary colors mix together' },
    ]
  },

  // 7. Shadow Puppets
  {
    id: 'arts-shadow-puppets',
    title: '🖐️🔦 Shadow Puppets',
    instruction: 'Match the hand shape to the shadow it makes!',
    type: 'dragDrop',
    difficulty: 2,
    data: {
      items: [
        { id: 1, text: '✌️ Two fingers up' },
        { id: 2, text: '🤙 Pinky and thumb out' },
        { id: 3, text: '🖐️ All fingers spread' },
        { id: 4, text: '👆 One finger pointing up' },
        { id: 5, text: '✊ Closed fist' },
        { id: 6, text: '🤘 Index and pinky up' },
        { id: 7, text: '👐 Two hands together, thumbs out' },
        { id: 8, text: '🤏 Fingers pinched together' },
      ],
      targets: [
        { id: 1, text: '🐰 Bunny rabbit ears' },
        { id: 2, text: '🐕 Dog head shape' },
        { id: 3, text: '🦚 Peacock fan tail' },
        { id: 4, text: '🐍 Tall snake' },
        { id: 5, text: '🪨 Round rock' },
        { id: 6, text: '🐂 Bull with horns' },
        { id: 7, text: '🦋 Butterfly wings' },
        { id: 8, text: '🐊 Crocodile mouth' },
      ]
    }
  },

  // 8. Recycled Art
  {
    id: 'arts-recycled-art',
    title: '♻️ Recycled Art',
    instruction: 'Learn about making art from things you reuse!',
    type: 'flashcard',
    difficulty: 2,
    data: [
      { front: '🧻 What can you make from a toilet paper roll?', back: 'A rocket, binoculars, a castle tower, or an animal! 🚀' },
      { front: '🥚 What can an egg carton become?', back: 'A caterpillar, a flower garden, or a paint palette! 🐛🌷' },
      { front: '📦 What can a cardboard box become?', back: 'A robot costume, a car, a dollhouse, or a castle! 🤖🏰' },
      { front: '🍶 What can a plastic bottle become?', back: 'A flower vase, a bird feeder, or a bowling pin! 🌻🐦' },
      { front: '📰 What can old newspapers become?', back: 'Papier-mache animals, hats, or pirate swords! 🏴‍☠️' },
      { front: '🧦 What can an old sock become?', back: 'A sock puppet with googly eyes! 🧦👀' },
      { front: '🥫 What can tin cans become?', back: 'Pencil holders, flower pots, or a phone! ✏️🌸' },
      { front: '💿 What can old CDs become?', back: 'Sparkly fish, suncatchers, or spinning tops! 🐟✨' },
      { front: '🧃 What can juice boxes become?', back: 'Tiny planters for growing seeds! 🌱' },
    ]
  },

  // 9. Music Tempo (Fast/Slow)
  {
    id: 'arts-music-tempo',
    title: '🎵 Fast and Slow Music',
    instruction: 'Match the activity to the right music speed!',
    type: 'dragDrop',
    difficulty: 2,
    data: {
      items: [
        { id: 1, text: '🐢 A turtle walking' },
        { id: 2, text: '🐇 A rabbit hopping fast' },
        { id: 3, text: '😴 A lullaby for bedtime' },
        { id: 4, text: '🎉 A party dance' },
        { id: 5, text: '🦥 A sloth climbing' },
        { id: 6, text: '🏃 Running a race' },
        { id: 7, text: '🧘 Calm stretching' },
        { id: 8, text: '🎪 Circus acrobats flipping' },
        { id: 9, text: '🌙 Rocking a baby' },
        { id: 10, text: '⚡ A superhero flying' },
      ],
      targets: [
        { id: 1, text: '🐌 Slow tempo' },
        { id: 2, text: '💨 Fast tempo' },
        { id: 3, text: '🐌 Slow tempo' },
        { id: 4, text: '💨 Fast tempo' },
        { id: 5, text: '🐌 Slow tempo' },
        { id: 6, text: '💨 Fast tempo' },
        { id: 7, text: '🐌 Slow tempo' },
        { id: 8, text: '💨 Fast tempo' },
        { id: 9, text: '🐌 Slow tempo' },
        { id: 10, text: '💨 Fast tempo' },
      ]
    }
  },

  // 10. Costume Design
  {
    id: 'arts-costume-design',
    title: '🎭 Costume Design',
    instruction: 'Learn about making costumes and dress-up!',
    type: 'multipleChoice',
    difficulty: 2,
    data: [
      { question: 'What does a costume designer do?', options: ['Creates outfits for characters 👗', 'Cooks food', 'Drives a car', 'Builds houses'], answer: 'Creates outfits for characters 👗', hint: 'They make what actors wear' },
      { question: 'What would a pirate costume have?', options: ['An eye patch and hat 🏴‍☠️', 'A crown and wand', 'Wings and a halo', 'A cape and mask'], answer: 'An eye patch and hat 🏴‍☠️', hint: 'Arrr, matey!' },
      { question: 'What could you use for a superhero cape?', options: ['A towel or blanket', 'A pillow', 'A shoe', 'A book'], answer: 'A towel or blanket', hint: 'Something big and flowy you can tie around your neck' },
      { question: 'What color is usually on a princess costume?', options: ['Pink or purple 👑', 'Brown and gray', 'Black only', 'Orange only'], answer: 'Pink or purple 👑', hint: 'Think of sparkly, royal colors' },
      { question: 'What do you put on your face to go with a costume?', options: ['Face paint or a mask 🎭', 'A hat', 'Gloves', 'Shoes'], answer: 'Face paint or a mask 🎭', hint: 'It changes how your face looks' },
      { question: 'What would a doctor costume include?', options: ['A white coat and stethoscope 🩺', 'A wand and hat', 'A sword and shield', 'Wings and a tail'], answer: 'A white coat and stethoscope 🩺', hint: 'Think about what you see at the doctor' },
      { question: 'What animal costume uses orange and black stripes?', options: ['A tiger 🐯', 'A dog', 'A fish', 'A bird'], answer: 'A tiger 🐯', hint: 'This big cat has stripes' },
      { question: 'What can you add to make a costume sparkly?', options: ['Glitter and sequins ✨', 'Dirt', 'Leaves', 'Rocks'], answer: 'Glitter and sequins ✨', hint: 'They catch the light and shine' },
    ]
  },

  // ===== DIFFICULTY 3 (Age 5) =====

  // 11. Architecture Basics
  {
    id: 'arts-architecture-basics',
    title: '🏛️ Amazing Architecture',
    instruction: 'Learn about the art of designing buildings!',
    type: 'multipleChoice',
    difficulty: 3,
    data: [
      { question: 'What is an architect?', options: ['A person who designs buildings 🏗️', 'A person who paints pictures', 'A person who sings songs', 'A person who cooks food'], answer: 'A person who designs buildings 🏗️', hint: 'They plan how buildings will look' },
      { question: 'What shape is the base of a pyramid? 🔺', options: ['A square', 'A circle', 'A triangle', 'A star'], answer: 'A square', hint: 'It has four equal sides on the bottom' },
      { question: 'What holds up the roof of a building?', options: ['Walls and columns', 'Windows', 'Doors', 'Paint'], answer: 'Walls and columns', hint: 'These tall, strong parts support the weight' },
      { question: 'What shape is a dome? 🕌', options: ['Half a sphere', 'A cube', 'A cone', 'A rectangle'], answer: 'Half a sphere', hint: 'Like cutting a ball in half' },
      { question: 'What does an architect draw before building?', options: ['A blueprint 📐', 'A painting', 'A comic', 'A letter'], answer: 'A blueprint 📐', hint: 'It is a detailed plan of the building' },
      { question: 'What famous tower in Paris is made of metal?', options: ['The Eiffel Tower 🗼', 'The Leaning Tower', 'Big Ben', 'The Great Wall'], answer: 'The Eiffel Tower 🗼', hint: 'It is in France and is very tall' },
      { question: 'What material are most modern skyscrapers made of?', options: ['Steel and glass 🏙️', 'Wood and straw', 'Paper and tape', 'Clay and mud'], answer: 'Steel and glass 🏙️', hint: 'They are shiny and very strong' },
      { question: 'What is a bridge designed to do?', options: ['Help people cross over water or roads 🌉', 'Hold up the sky', 'Block the road', 'Store food'], answer: 'Help people cross over water or roads 🌉', hint: 'It connects two sides' },
      { question: 'Which shape is the strongest for building?', options: ['A triangle 🔺', 'A circle', 'A star', 'A heart'], answer: 'A triangle 🔺', hint: 'It does not bend easily when pushed' },
    ]
  },

  // 12. Animation Concepts
  {
    id: 'arts-animation-concepts',
    title: '🎬 Animation Magic',
    instruction: 'Learn how drawings come to life in animation!',
    type: 'flashcard',
    difficulty: 3,
    data: [
      { front: '🎬 What is animation?', back: 'Making pictures look like they are moving by showing many drawings very quickly!' },
      { front: '📖 What is a flipbook?', back: 'A small book where each page has a slightly different drawing. Flip the pages fast and it looks like it moves! 📖✨' },
      { front: '🖼️ What is a frame in animation?', back: 'One single picture. Many frames shown quickly make animation! Films show 24 frames per second! 🎞️' },
      { front: '🤔 How do animators make a character walk?', back: 'They draw the character in slightly different positions for each frame, moving the legs step by step! 🚶' },
      { front: '🧱 What is stop-motion animation?', back: 'Moving real objects (like clay or toys) a tiny bit, taking a photo each time, then playing the photos fast! 📸' },
      { front: '💻 What is computer animation?', back: 'Using computers to create moving pictures instead of drawing by hand. Movies like Toy Story use this! 🖥️' },
      { front: '🎨 What is a storyboard?', back: 'A series of drawings that plan out what will happen in the animation, like a comic strip! 📋' },
      { front: '🔄 What is a looping animation?', back: 'An animation that repeats over and over, like a character waving or a ball bouncing endlessly! 🔁' },
      { front: '🐭 Who created Mickey Mouse, a famous animated character?', back: 'Walt Disney created Mickey Mouse in 1928! 🏰' },
    ]
  },

  // 13. Music Genres
  {
    id: 'arts-music-genres',
    title: '🎶 Music Genres',
    instruction: 'Match each music genre to what describes it!',
    type: 'dragDrop',
    difficulty: 3,
    data: {
      items: [
        { id: 1, text: '🎸 Rock' },
        { id: 2, text: '🎷 Jazz' },
        { id: 3, text: '🤠 Country' },
        { id: 4, text: '🩰 Classical' },
        { id: 5, text: '🎤 Pop' },
        { id: 6, text: '🥁 Hip-Hop' },
        { id: 7, text: '🎺 Marching Band' },
        { id: 8, text: '🪕 Folk' },
      ],
      targets: [
        { id: 1, text: 'Loud electric guitars and drums' },
        { id: 2, text: 'Smooth saxophone and improvising' },
        { id: 3, text: 'Guitars and singing about farm life' },
        { id: 4, text: 'Orchestras with violins and piano' },
        { id: 5, text: 'Catchy songs everyone knows' },
        { id: 6, text: 'Rapping and strong beats' },
        { id: 7, text: 'Playing while walking in parades' },
        { id: 8, text: 'Simple songs passed down through families' },
      ]
    }
  },

  // 14. Art Criticism (Describe Art)
  {
    id: 'arts-art-criticism',
    title: '🧐 Talking About Art',
    instruction: 'Learn how to describe and think about artwork!',
    type: 'multipleChoice',
    difficulty: 3,
    data: [
      { question: 'What is the first step when looking at art?', options: ['Describe what you see 👀', 'Say if you like it', 'Walk away', 'Close your eyes'], answer: 'Describe what you see 👀', hint: 'Look carefully and name the things in it' },
      { question: 'If a painting uses lots of red and orange, how might it feel?', options: ['Warm and exciting 🔥', 'Cold and calm', 'Sad and gloomy', 'Quiet and sleepy'], answer: 'Warm and exciting 🔥', hint: 'Red and orange are warm colors' },
      { question: 'What does it mean to say art has "texture"?', options: ['How it looks like it would feel to touch 🤚', 'How loud it is', 'How fast it moves', 'How much it costs'], answer: 'How it looks like it would feel to touch 🤚', hint: 'Rough, smooth, bumpy, or soft' },
      { question: 'If a painting shows a dark stormy sky, what mood does it create?', options: ['Scary or dramatic 🌩️', 'Happy and silly', 'Funny and bright', 'Calm and peaceful'], answer: 'Scary or dramatic 🌩️', hint: 'Storms can feel a little frightening' },
      { question: 'What are "warm colors"?', options: ['Red, orange, and yellow 🔴🟠🟡', 'Blue, green, and purple', 'Black, white, and gray', 'Pink, teal, and silver'], answer: 'Red, orange, and yellow 🔴🟠🟡', hint: 'Think of fire and the sun' },
      { question: 'What are "cool colors"?', options: ['Blue, green, and purple 🔵🟢🟣', 'Red, orange, and yellow', 'Black, white, and brown', 'Gold, silver, and bronze'], answer: 'Blue, green, and purple 🔵🟢🟣', hint: 'Think of water and the sky' },
      { question: 'Why do people make art?', options: ['To express feelings and ideas 💡', 'Only to sell it', 'Because they have to', 'Only for school'], answer: 'To express feelings and ideas 💡', hint: 'Art lets you share what is inside you' },
      { question: 'What is the background of a painting?', options: ['The part that looks farthest away 🏔️', 'The frame around it', 'The biggest shape', 'The brightest color'], answer: 'The part that looks farthest away 🏔️', hint: 'It is behind everything else in the picture' },
      { question: 'Is there a wrong way to feel about art?', options: ['No, everyone can feel differently! 💜', 'Yes, only one answer is right', 'Yes, you must agree with the artist', 'Yes, the teacher decides'], answer: 'No, everyone can feel differently! 💜', hint: 'Art is about personal feelings' },
    ]
  },

  // 15. Textile Arts
  {
    id: 'arts-textile-arts',
    title: '🧵 Textile Arts',
    instruction: 'Match the textile craft to what it creates!',
    type: 'dragDrop',
    difficulty: 3,
    data: {
      items: [
        { id: 1, text: '🧶 Knitting' },
        { id: 2, text: '🪡 Embroidery' },
        { id: 3, text: '🧵 Sewing' },
        { id: 4, text: '🧣 Crocheting' },
        { id: 5, text: '🎨 Fabric dyeing' },
        { id: 6, text: '✂️ Quilting' },
        { id: 7, text: '🪢 Macrame' },
        { id: 8, text: '👕 Screen printing' },
      ],
      targets: [
        { id: 1, text: 'Using two needles and yarn to make scarves' },
        { id: 2, text: 'Stitching decorative pictures on cloth' },
        { id: 3, text: 'Joining fabric pieces with needle and thread' },
        { id: 4, text: 'Using one hooked needle and yarn' },
        { id: 5, text: 'Changing the color of cloth' },
        { id: 6, text: 'Sewing fabric squares into a warm blanket' },
        { id: 7, text: 'Knotting rope into wall hangings' },
        { id: 8, text: 'Pressing ink designs onto shirts' },
      ]
    }
  },

];

export default artsR3;
