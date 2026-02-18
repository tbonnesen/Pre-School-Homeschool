/**
 * Topic-level help data with YouTube video links for the Learn More feature.
 * ~60 topic entries covering all 622 activities via ID pattern matching.
 */

export const HELP_TOPICS = {
  // ==================== LETTERS ====================
  'letter-recognition': {
    patterns: ['letter-recognize', 'letter-match', 'letter-hunt', 'letters-ae-', 'letters-fj-', 'letters-ko-', 'letters-pt-', 'letters-uz-', 'uppercase-lowercase', 'upper-lower-match', 'same-different-letters', 'letter-shapes', 'letters-name-recognition'],
    title: 'Letter Recognition',
    helpText: 'Letters are the building blocks of words! Each letter has an uppercase (big) and lowercase (small) form. Try to match them up!',
    emoji: '🔤',
    youtubeVideos: [
      { title: 'Learn the Alphabet A-Z', videoId: 'hq3yfQnllfQ', channel: 'Jack Hartmann' },
      { title: 'ABC Song with Sounds', videoId: '7we0gIbphOc', channel: 'Sesame Street' },
    ],
  },
  'alphabet-flashcards': {
    patterns: ['alphabet-flashcards', 'alphabet-animals'],
    title: 'Alphabet Flashcards',
    helpText: 'Flashcards help you remember letters quickly! Look at each letter and try to say its name and sound.',
    emoji: '🃏',
    youtubeVideos: [
      { title: 'Alphabet Flashcards for Kids', videoId: 'ezFhzkBgJK8', channel: 'Jack Hartmann' },
    ],
  },
  'letter-sounds': {
    patterns: ['letter-sounds', 'beginning-sounds', 'ending-sounds', 'first-letter-', 'match-picture-first-letter', 'letters-sounds-transport'],
    title: 'Letter Sounds & Phonics',
    helpText: 'Every letter makes a special sound! The letter B says "buh", the letter C says "kuh". Knowing letter sounds helps you read!',
    emoji: '🔊',
    youtubeVideos: [
      { title: 'Phonics Song with Two Words', videoId: 'BELlZKpi1Zs', channel: 'ChuChu TV' },
      { title: 'Letter Sounds A-Z', videoId: '36IBDpTRVNE', channel: 'Jack Hartmann' },
    ],
  },
  'sight-words': {
    patterns: ['sight-word', 'letters-sight-word', 'sight-words-preprimary', 'sight-words-primer', 'sight-words-first-grade'],
    title: 'Sight Words',
    helpText: 'Sight words are words you see a lot like "the", "and", "is". When you know them by heart, reading becomes much easier!',
    emoji: '👀',
    youtubeVideos: [
      { title: 'Sight Words Level 1', videoId: 'bsXnFNnSNOw', channel: 'Jack Hartmann' },
    ],
  },
  'rhyming': {
    patterns: ['rhym'],
    title: 'Rhyming Words',
    helpText: 'Rhyming words sound the same at the end, like "cat" and "hat"! Listening for rhymes helps you become a great reader.',
    emoji: '🎵',
    youtubeVideos: [
      { title: 'Rhyming Words for Kids', videoId: 'RlPXoOTT1nU', channel: 'Jack Hartmann' },
    ],
  },
  'cvc-words': {
    patterns: ['cvc-', 'read-cvc', 'spelling-cvc', 'word-building', 'word-builder-cvc', 'word-builder-ccvc', 'word-builder-blends'],
    title: 'CVC Words',
    helpText: 'CVC words have a consonant, vowel, consonant pattern like "cat" or "dog". Sound out each letter and blend them together!',
    emoji: '📝',
    youtubeVideos: [
      { title: 'CVC Words for Kids', videoId: 'hokidYBqLYY', channel: 'Jack Hartmann' },
    ],
  },
  'vowels': {
    patterns: ['vowel', 'missing-vowel'],
    title: 'Vowels',
    helpText: 'A, E, I, O, U are the vowels! Every word needs at least one vowel. They can make short or long sounds.',
    emoji: '🌟',
    youtubeVideos: [
      { title: 'Short Vowel Sounds', videoId: 'UGQxmOP5_6k', channel: 'Jack Hartmann' },
    ],
  },
  'digraphs': {
    patterns: ['digraph'],
    title: 'Digraphs',
    helpText: 'A digraph is two letters that make one sound together, like "sh" in "ship" or "ch" in "cheese". Listen carefully for these special sounds!',
    emoji: '🤝',
    youtubeVideos: [
      { title: 'Digraphs SH CH TH WH', videoId: 'UTnOBl2VfWk', channel: 'Jack Hartmann' },
    ],
  },
  'compound-words': {
    patterns: ['compound-word', 'letters-compound'],
    title: 'Compound Words',
    helpText: 'A compound word is made when two small words join together to make a new word. Like "sun" + "flower" = "sunflower"!',
    emoji: '🔗',
    youtubeVideos: [
      { title: 'Compound Words for Kids', videoId: 'MO98fNgkXoM', channel: 'Jack Hartmann' },
    ],
  },
  'word-endings': {
    patterns: ['word-endings', 'suffixes', 'prefixes', 'plural-words'],
    title: 'Word Parts',
    helpText: 'Words can change when we add parts to the end or beginning. Adding "-ing" to "jump" makes "jumping"!',
    emoji: '🧩',
    youtubeVideos: [
      { title: 'Suffixes for Kids', videoId: 'BoRw0eLiRfA', channel: 'Jack Hartmann' },
    ],
  },
  'reading-comprehension': {
    patterns: ['reading-comprehension', 'story-sequence', 'storytelling-words', 'letters-reading-passages', 'letters-writing-prompts'],
    title: 'Reading & Stories',
    helpText: 'Reading is like going on an adventure! Think about what happens in the story - who is it about? What did they do?',
    emoji: '📚',
    youtubeVideos: [
      { title: 'Reading Comprehension for Kids', videoId: 'KYOGTmlSe4M', channel: 'Khan Academy Kids' },
    ],
  },
  'abc-order': {
    patterns: ['abc-', 'singing-abc', 'missing-letter-abc', 'letters-dictionary'],
    title: 'ABC Order',
    helpText: 'The alphabet has a special order from A to Z! Knowing ABC order helps you find words in a dictionary and organize things.',
    emoji: '🔠',
    youtubeVideos: [
      { title: 'ABC Song', videoId: 'BELlZKpi1Zs', channel: 'ChuChu TV' },
    ],
  },
  'syllables': {
    patterns: ['syllable', 'letters-syllable'],
    title: 'Syllables',
    helpText: 'Syllables are the beats in a word. Clap your hands for each beat: "but-ter-fly" has 3 beats! This helps with reading big words.',
    emoji: '👏',
    youtubeVideos: [
      { title: 'Syllable Clapping', videoId: 'TvMyssfAUx0', channel: 'Jack Hartmann' },
    ],
  },
  'letters-misc': {
    patterns: ['opposite-words', 'odd-word-out', 'match-word-to-picture', 'word-family', 'word-length', 'sentence-types', 'silent-letters', 'homophones', 'describing-words', 'action-words', 'consonant-blends', 'book-parts', 'capital-letters', 'letters-environmental-print', 'letters-in-name'],
    title: 'Word Skills',
    helpText: 'Words are amazing! There are so many kinds of words - some describe things, some show actions, and some sound the same but mean different things.',
    emoji: '✨',
    youtubeVideos: [
      { title: 'Parts of Speech for Kids', videoId: 'pCaBpXP4BFY', channel: 'Jack Hartmann' },
    ],
  },

  // ==================== MATH ====================
  'counting-basic': {
    patterns: ['count-objects', 'counting-fingers', 'counting-snacks', 'math-count-', 'math-counting-backwards'],
    title: 'Counting',
    helpText: 'Counting is pointing to each thing one at a time and saying a number. Start with 1 and keep going! Touch each item as you count.',
    emoji: '🔢',
    youtubeVideos: [
      { title: 'Count to 20', videoId: '0TgLtF3PMOc', channel: 'Jack Hartmann' },
      { title: 'Counting to 100', videoId: 'bGetqbqDVaA', channel: 'Jack Hartmann' },
    ],
  },
  'number-recognition': {
    patterns: ['number-recognize', 'number-flashcards', 'number-words', 'number-order', 'number-neighbors', 'math-number-order', 'math-number-tracing', 'math-before-after'],
    title: 'Numbers',
    helpText: 'Numbers are everywhere! Each number has a name and a shape. Learning to recognize numbers helps you count and do math.',
    emoji: '🔟',
    youtubeVideos: [
      { title: 'Number Recognition 1-20', videoId: 'D0Ajq682yrA', channel: 'Jack Hartmann' },
    ],
  },
  'shapes': {
    patterns: ['shapes-recognize', 'math-shape', 'shape-patterns', 'symmetry-shapes', 'math-same-different-shapes'],
    title: 'Shapes',
    helpText: 'Shapes are all around us! A door is a rectangle, a wheel is a circle, and a slice of pizza is a triangle. Look for shapes everywhere!',
    emoji: '🔷',
    youtubeVideos: [
      { title: 'Shapes Song for Kids', videoId: 'OEbRDtCAFdU', channel: 'Jack Hartmann' },
    ],
  },
  'addition': {
    patterns: ['addition', 'math-addition', 'simple-addition', 'one-more', 'doubles', 'math-double', 'missing-number-equation'],
    title: 'Addition',
    helpText: 'Addition means putting groups together to find how many in all. If you have 2 apples and get 3 more, count them all up!',
    emoji: '➕',
    youtubeVideos: [
      { title: 'Addition for Kids', videoId: 'OasbYWF4_S8', channel: 'Jack Hartmann' },
      { title: 'Numberblocks Addition', videoId: 'uhMGBFzstWI', channel: 'Numberblocks' },
    ],
  },
  'subtraction': {
    patterns: ['subtraction', 'math-subtraction', 'simple-subtraction'],
    title: 'Subtraction',
    helpText: 'Subtraction means taking away. If you have 5 cookies and eat 2, how many are left? Count what remains!',
    emoji: '➖',
    youtubeVideos: [
      { title: 'Subtraction for Kids', videoId: 'UT82IOsi3EY', channel: 'Jack Hartmann' },
    ],
  },
  'patterns': {
    patterns: ['patterns-easy', 'math-patterns', 'what-comes-next'],
    title: 'Patterns',
    helpText: 'A pattern is something that repeats! Like red, blue, red, blue. What comes next? Finding patterns is like solving a puzzle!',
    emoji: '🔁',
    youtubeVideos: [
      { title: 'Patterns for Kids', videoId: 'LYKBuSoHpFo', channel: 'Jack Hartmann' },
    ],
  },
  'sorting-comparing': {
    patterns: ['sorting-by', 'color-sorting', 'size-sorting', 'comparing', 'math-comparing', 'more-less', 'same-different-amounts', 'math-sorting'],
    title: 'Sorting & Comparing',
    helpText: 'Sorting means grouping things that are alike together. Which group has more? Which has less? Comparing helps us understand numbers!',
    emoji: '⚖️',
    youtubeVideos: [
      { title: 'Sorting and Classifying', videoId: 'aQWnGPfx0Dw', channel: 'Khan Academy Kids' },
    ],
  },
  'measurement': {
    patterns: ['big-and-small', 'tall-and-short', 'empty-and-full', 'math-big-vs', 'math-tall-vs', 'math-full-vs', 'math-heavy', 'math-longer', 'math-measurement', 'math-temperature', 'math-weight', 'measuring-blocks', 'math-first-and-last', 'math-first-last'],
    title: 'Measurement & Size',
    helpText: 'We can measure how big, tall, heavy, or long things are! Is the elephant bigger than the mouse? Is the building taller than the tree?',
    emoji: '📏',
    youtubeVideos: [
      { title: 'Measurement for Kids', videoId: '1THkmeKQB8s', channel: 'Jack Hartmann' },
    ],
  },
  'skip-counting': {
    patterns: ['skip-count', 'math-skip-count', 'counting-by-'],
    title: 'Skip Counting',
    helpText: 'Skip counting means counting by jumping over numbers! Count by 2s: 2, 4, 6, 8... Count by 5s: 5, 10, 15, 20... It makes counting faster!',
    emoji: '🦘',
    youtubeVideos: [
      { title: 'Skip Counting by 2s', videoId: 'GvTcpfSnOMQ', channel: 'Jack Hartmann' },
    ],
  },
  'time-money': {
    patterns: ['telling-time', 'math-telling-time', 'calendar', 'math-calendar', 'coin-recognition', 'math-money'],
    title: 'Time & Money',
    helpText: 'Clocks tell us what time it is and calendars tell us what day it is. Coins have different values - a nickel is 5 cents!',
    emoji: '🕐',
    youtubeVideos: [
      { title: 'Telling Time for Kids', videoId: 'LFrKYjrIDs8', channel: 'Jack Hartmann' },
    ],
  },
  'fractions': {
    patterns: ['fraction', 'math-fraction', 'math-basic-fractions', 'halves', 'math-half'],
    title: 'Fractions',
    helpText: 'A fraction is a part of a whole! When you cut a pizza in half, each piece is one-half. Two halves make a whole!',
    emoji: '🍕',
    youtubeVideos: [
      { title: 'Fractions for Kids', videoId: 'n0FZhQ_GkKw', channel: 'Jack Hartmann' },
    ],
  },
  'place-value': {
    patterns: ['place-value', 'math-place-value', 'math-tens-ones', 'math-number-bonds', 'math-even-and-odd', 'math-odd-even', 'counting-backwards', 'math-equal-groups'],
    title: 'Number Concepts',
    helpText: 'Numbers have special places! In 15, the 1 is in the tens place and the 5 is in the ones place. This helps us understand big numbers!',
    emoji: '🧮',
    youtubeVideos: [
      { title: 'Place Value for Kids', videoId: 'aIaELkmHn-M', channel: 'Jack Hartmann' },
    ],
  },
  'math-misc': {
    patterns: ['position-words', 'positional-words', 'math-above-vs', 'math-ordinal', 'problem-solving', 'simple-word-problems', 'math-word-problems', 'simple-multiplication', 'math-estimation', 'math-graphing', 'math-bar-graphs', 'data-tallying', 'subtraction-stories'],
    title: 'Math Skills',
    helpText: 'Math is everywhere! We use math when we count, measure, sort, and solve problems. Every problem has a solution - keep trying!',
    emoji: '🧠',
    youtubeVideos: [
      { title: 'Word Problems for Kids', videoId: 'JkXxivKERiM', channel: 'Khan Academy Kids' },
    ],
  },

  // ==================== SCIENCE ====================
  'animals': {
    patterns: ['animal-', 'animals-identify', 'baby-animals', 'farm-animals', 'nocturnal-animals', 'ocean-animals', 'insects-bugs', 'science-animal-', 'science-bugs-', 'science-farm-animals', 'science-nocturnal', 'science-pet-care', 'science-endangered'],
    title: 'Animals & Nature',
    helpText: 'Animals are amazing! They live in different places, eat different foods, and have special features to help them survive. What is your favorite animal?',
    emoji: '🐾',
    youtubeVideos: [
      { title: 'Amazing Animals', videoId: 'OwRmivbNgQk', channel: 'National Geographic Kids' },
      { title: 'Animal Habitats', videoId: 'dP15zlyra3c', channel: 'SciShow Kids' },
    ],
  },
  'weather-seasons': {
    patterns: ['weather', 'seasons', 'day-night', 'science-weather', 'science-seasons', 'science-climate', 'science-rain-clouds', 'science-sky-objects', 'science-cloud-types'],
    title: 'Weather & Seasons',
    helpText: 'Weather changes every day! It can be sunny, rainy, snowy, or windy. Each season brings different weather and fun activities.',
    emoji: '🌦️',
    youtubeVideos: [
      { title: 'Weather for Kids', videoId: 'Uo8lbeNAUO4', channel: 'SciShow Kids' },
    ],
  },
  'plants': {
    patterns: ['plant-', 'what-plants-need', 'seeds-and-growing', 'fruits-vegetables', 'science-plant-', 'science-fruits-growing', 'science-seeds-sprouting', 'science-growing-things', 'science-photosynthesis'],
    title: 'Plants & Growing',
    helpText: 'Plants need sunlight, water, and soil to grow! A tiny seed can grow into a big tree. Plants give us food, clean air, and beauty.',
    emoji: '🌱',
    youtubeVideos: [
      { title: 'How Plants Grow', videoId: 'dUBIQ1fTRzI', channel: 'SciShow Kids' },
    ],
  },
  'body-health': {
    patterns: ['body-parts', 'five-senses', 'healthy-foods', 'human-body', 'science-body-', 'science-food-groups', 'science-human-body', 'science-brain-parts', 'science-food-preservation', 'science-bones-muscles'],
    title: 'My Body & Health',
    helpText: 'Your body is incredible! You have five senses to explore the world - seeing, hearing, smelling, tasting, and touching. Eating healthy keeps you strong!',
    emoji: '💪',
    youtubeVideos: [
      { title: 'Five Senses for Kids', videoId: 'vOdQJEv1imk', channel: 'SciShow Kids' },
    ],
  },
  'space': {
    patterns: ['solar-system', 'space-basics', 'science-solar-system', 'science-space-', 'science-astronomy', 'science-constellations'],
    title: 'Space & Planets',
    helpText: 'Space is full of amazing things! Our sun is a star, Earth is one of 8 planets, and the moon lights up our night sky.',
    emoji: '🚀',
    youtubeVideos: [
      { title: 'Solar System for Kids', videoId: 'Qd6nLM2QlWw', channel: 'SciShow Kids' },
    ],
  },
  'earth-materials': {
    patterns: ['volcano', 'earth-layers', 'science-earth-', 'science-rocks-minerals', 'hot-cold', 'science-hot-cold'],
    title: 'Earth Science',
    helpText: 'Our planet Earth is full of amazing rocks, mountains, and volcanoes! The Earth has different layers inside, like a giant ball.',
    emoji: '🌍',
    youtubeVideos: [
      { title: 'Rocks and Minerals', videoId: 'xbQLTBuHku4', channel: 'SciShow Kids' },
    ],
  },
  'water': {
    patterns: ['water-cycle', 'sink-or-float', 'science-water-', 'science-ocean-zones', 'science-buoyancy', 'desert-habitats', 'forest-habitats', 'science-habitats', 'science-pond-ecosystem', 'ecosystems', 'science-food-chain', 'food-chains'],
    title: 'Water & Habitats',
    helpText: 'Water is everywhere - in oceans, rivers, and clouds! It goes around and around in the water cycle. Many animals live in water habitats.',
    emoji: '💧',
    youtubeVideos: [
      { title: 'Water Cycle for Kids', videoId: 'ncORPosDrjI', channel: 'SciShow Kids' },
    ],
  },
  'science-misc': {
    patterns: ['living-nonliving', 'light-and-shadow', 'recycling', 'simple-machines', 'simple-tools', 'solids-and-liquids', 'states-of-matter', 'magnets', 'electricity', 'colors-nature', 'dinosaur', 'butterfly-life-cycle', 'science-life-cycles', 'science-magnets', 'science-electricity', 'science-simple-machines', 'science-states-matter', 'science-colors-mixing', 'science-earth-sky', 'science-energy-sources', 'science-scientific-method', 'science-shadow-experiments', 'science-rainbow', 'science-magnifying', 'science-microscopic', 'science-dna', 'science-evolution', 'science-circuits', 'science-chemical', 'science-nature-sizes', 'science-nature-textures', 'science-dinosaur', 'science-frog-lifecycle', 'science-sort-living-nonliving', 'science-simple-experiments', 'science-gravity-intro', 'science-sound-waves', 'science-animal-classification'],
    title: 'Science Discovery',
    helpText: 'Science is all about asking questions and finding answers! Is it alive? Does it float? What happens when you mix colors? Let\'s find out!',
    emoji: '🔬',
    youtubeVideos: [
      { title: 'Science for Kids', videoId: 'NCIuJWqhEB8', channel: 'SciShow Kids' },
      { title: 'Simple Machines', videoId: 'fvOmaf2GfCY', channel: 'SciShow Kids' },
    ],
  },

  // ==================== SOCIAL ====================
  'feelings': {
    patterns: ['feelings-', 'empathy', 'managing-anger', 'disappointment', 'self-regulation', 'social-emotions-', 'social-feelings-', 'social-empathy', 'social-my-feelings', 'social-calm-down', 'social-managing-worries', 'social-handling-disappointment'],
    title: 'Feelings & Emotions',
    helpText: 'Everyone has feelings! Happy, sad, angry, excited - all feelings are okay. It helps to name your feelings and talk about them.',
    emoji: '😊',
    youtubeVideos: [
      { title: 'Feelings & Emotions', videoId: 'jeooqIIWYFA', channel: 'Sesame Street' },
    ],
  },
  'kindness-sharing': {
    patterns: ['kindness', 'sharing', 'taking-turns', 'please-and-thank', 'manners', 'gratitude', 'gentle-with-pets', 'social-sharing-', 'social-being-kind', 'social-good-manners', 'social-gratitude', 'social-creative-gratitude', 'social-being-gentle', 'social-gentle-touch', 'social-waiting-turn', 'social-helping-others', 'social-helping-at-home', 'helping-at-home'],
    title: 'Kindness & Sharing',
    helpText: 'Being kind means caring about others! Saying "please" and "thank you", sharing toys, and helping friends are all ways to show kindness.',
    emoji: '💝',
    youtubeVideos: [
      { title: 'Kindness for Kids', videoId: 'kkYHSsOaGTs', channel: 'Sesame Street' },
    ],
  },
  'friendship': {
    patterns: ['friendship', 'making-friends', 'social-making-friends', 'social-teamwork', 'teamwork', 'social-healthy-friendships', 'social-playground-friends', 'social-building-trust', 'social-group-decisions', 'social-making-compromises'],
    title: 'Friendship & Teamwork',
    helpText: 'Friends make life more fun! Good friends listen, share, take turns, and help each other. Being a good friend means being kind and fair.',
    emoji: '🤝',
    youtubeVideos: [
      { title: 'Making Friends', videoId: 'JqHPBJnBfCE', channel: 'Sesame Street' },
    ],
  },
  'safety': {
    patterns: ['safety-rules', 'trusted-adults', 'digital-safety', 'privacy-boundaries', 'personal-space', 'social-safety-', 'social-digital-', 'social-personal-space', 'social-playground-rules'],
    title: 'Safety & Boundaries',
    helpText: 'Staying safe is important! Learn safety rules, know your trusted adults, and remember that your body belongs to you.',
    emoji: '🛡️',
    youtubeVideos: [
      { title: 'Safety Rules for Kids', videoId: 'zhTYPQ_BQWE', channel: 'Sesame Street' },
    ],
  },
  'family-community': {
    patterns: ['my-family', 'community-helpers', 'different-families', 'social-my-family', 'social-community-helpers', 'social-diversity'],
    title: 'Family & Community',
    helpText: 'Families come in all shapes and sizes! Community helpers like doctors, firefighters, and teachers help keep everyone safe and healthy.',
    emoji: '👪',
    youtubeVideos: [
      { title: 'Community Helpers', videoId: '_08GBhHwsFg', channel: 'Jack Hartmann' },
    ],
  },
  'social-skills': {
    patterns: ['good-listener', 'greetings', 'apologizing', 'honesty', 'conflict-resolution', 'problem-solving', 'responsibility', 'standing-up', 'words-not-hands', 'waiting-patiently', 'growth-mindset', 'leadership', 'self-care', 'bedtime-routine', 'cleaning-up', 'respecting-differences', 'social-good-listener', 'social-saying-sorry', 'social-honesty', 'social-conflict-resolution', 'social-responsibility', 'social-self-confidence', 'social-leadership', 'social-daily-routines', 'social-dealing-with-change', 'social-growth-mindset', 'social-bedtime-routine', 'social-care-belongings', 'social-listening-ears', 'social-body-language', 'social-communication-styles', 'social-good-leader', 'social-respecting-belongings', 'social-upstander', 'social-mentoring', 'social-resolving-misunderstandings', 'social-self-reflection', 'social-stereotypes', 'social-time-management', 'social-homelessness', 'social-feelings-thermometer', 'social-taking-care-of-self', 'social-new-situations', 'social-asking-for-help', 'social-peer-pressure', 'social-coping-big-changes', 'social-media-advertising', 'social-cultural-celebrations'],
    title: 'Social Skills',
    helpText: 'Social skills help us get along with others! Being a good listener, saying sorry when we make mistakes, and being honest are all important.',
    emoji: '🌟',
    youtubeVideos: [
      { title: 'Good Manners for Kids', videoId: 'dD5E_8Qqfm4', channel: 'Sesame Street' },
    ],
  },

  // ==================== MOTOR ====================
  'tracing-shapes': {
    patterns: ['trace-hearts', 'trace-arrows', 'trace-fruits', 'trace-waves', 'trace-flowers', 'trace-crosses', 'trace-clouds', 'trace-diamonds', 'trace-weather-symbols', 'trace-geometric', 'trace-3d-shapes', 'trace-animal-shapes', 'trace-complex-shapes', 'trace-detailed-animals', 'trace-musical-notes', 'trace-bumpy', 'trace-spirals', 'trace-rainbow', 'trace-mountains', 'trace-simple-maze', 'trace-symmetry', 'trace-dots-pattern', 'trace-dotted-paths', 'trace-map-routes', 'trace-shapes', 'trace-lines', 'trace-curves', 'trace-loops', 'trace-zigzags', 'trace-path-animal', 'trace-patterns', 'finger-paint', 'finger-trace', 'dot-painting', 'connect-dots', 'copy-pattern', 'motor-trace-vehicles', 'motor-trace-seasons', 'motor-trace-word-families'],
    title: 'Tracing & Drawing Shapes',
    helpText: 'Tracing helps your fingers get stronger and steadier! Follow the lines carefully and take your time. Practice makes your hands smarter!',
    emoji: '✏️',
    youtubeVideos: [
      { title: 'Fine Motor Activities', videoId: 'UyaqfWOXKHQ', channel: 'Cosmic Kids Yoga' },
    ],
  },
  'tracing-letters': {
    patterns: ['trace-letters', 'trace-lowercase', 'trace-uppercase', 'trace-cursive', 'trace-script', 'trace-name', 'letter-trace', 'trace-short-sentences', 'trace-paragraphs', 'trace-sight-words', 'trace-words'],
    title: 'Tracing Letters & Words',
    helpText: 'Tracing letters helps you learn to write! Start at the top and follow the line down. Uppercase letters are big, lowercase letters are small.',
    emoji: '🖊️',
    youtubeVideos: [
      { title: 'How to Write Letters', videoId: '_oA37GIeg7c', channel: 'Jack Hartmann' },
    ],
  },
  'tracing-numbers': {
    patterns: ['trace-numbers'],
    title: 'Tracing Numbers',
    helpText: 'Practice writing numbers by tracing them! Start at the top and follow the line. Numbers help us count and do math.',
    emoji: '🔢',
    youtubeVideos: [
      { title: 'How to Write Numbers', videoId: '6YIClB1YNHI', channel: 'Jack Hartmann' },
    ],
  },
  'writing': {
    patterns: ['write-'],
    title: 'Writing Practice',
    helpText: 'Writing is putting letters together to make words and sentences! Take your time and try your best. Every writer starts with practice!',
    emoji: '✍️',
    youtubeVideos: [
      { title: 'Handwriting for Kids', videoId: 'jWLJJiEanyI', channel: 'Jack Hartmann' },
    ],
  },
  'freeform-drawing': {
    patterns: ['draw-'],
    title: 'Creative Drawing',
    helpText: 'Drawing is a wonderful way to express yourself! There is no wrong way to draw. Use your imagination and have fun creating!',
    emoji: '🎨',
    youtubeVideos: [
      { title: 'How to Draw for Kids', videoId: 'IWGgcqfDYdo', channel: 'Art for Kids Hub' },
    ],
  },

  // ==================== ARTS ====================
  'colors': {
    patterns: ['color-match', 'color-mix', 'colors-recognize', 'primary-secondary', 'warm-cool', 'arts-basic-color', 'arts-color-mixing', 'arts-color-objects', 'arts-color-wheel', 'arts-complementary-colors', 'arts-favorite-colors', 'arts-rainbow-order', 'color-harmony', 'favorite-colors'],
    title: 'Colors & Color Mixing',
    helpText: 'Colors are magical! Red, yellow, and blue are primary colors. Mix them to make new colors - red + yellow = orange! What colors do you see?',
    emoji: '🌈',
    youtubeVideos: [
      { title: 'Colors for Kids', videoId: 'pFlhjB6cBKs', channel: 'Art for Kids Hub' },
    ],
  },
  'music': {
    patterns: ['musical-', 'clapping-rhythm', 'music-', 'arts-instrument-sounds', 'arts-music-', 'arts-rhythm-patterns', 'arts-singing-songs', 'arts-loud-quiet', 'loud-soft-sounds', 'silly-songs', 'world-music', 'orchestra-instruments', 'rhythm-patterns', 'arts-musical-notes'],
    title: 'Music & Rhythm',
    helpText: 'Music is sounds put together in fun ways! Clap along with the beat, sing your favorite songs, and try different instruments.',
    emoji: '🎵',
    youtubeVideos: [
      { title: 'Musical Instruments for Kids', videoId: 'yYrBkMy3tTY', channel: 'Jack Hartmann' },
    ],
  },
  'drawing-art': {
    patterns: ['draw-animal', 'drawing-with-shapes', 'arts-draw-', 'arts-lines-dots', 'arts-finger-paint', 'arts-finger-painting', 'arts-pattern-drawing', 'arts-shading-texture', 'arts-perspective', 'arts-stamp-art', 'finger-painting-fun', 'shapes-art', 'shapes-in-nature', 'shapes-we-see', 'free-draw', 'pattern-creator', 'elements-of-art'],
    title: 'Drawing & Art',
    helpText: 'Art is about expressing yourself! Use lines, shapes, and colors to create something amazing. There are no mistakes in art - only happy accidents!',
    emoji: '🖼️',
    youtubeVideos: [
      { title: 'Easy Drawing for Kids', videoId: 'IWGgcqfDYdo', channel: 'Art for Kids Hub' },
    ],
  },
  'crafts': {
    patterns: ['collage', 'paper-crafts', 'arts-paper-folding', 'arts-origami', 'arts-recycled-art', 'arts-collage', 'arts-clay-creations', 'arts-tie-dye', 'arts-weaving', 'arts-textile', 'arts-pottery', 'arts-mixed-media', 'arts-nature-art', 'nature-art', 'arts-seasonal-crafts', 'collage-making', 'arts-mosaic-art', 'arts-printmaking', 'arts-face-painting'],
    title: 'Crafts & Creating',
    helpText: 'Crafts let you make amazing things with your hands! Cut, fold, glue, and create. You can make art from almost anything!',
    emoji: '🎭',
    youtubeVideos: [
      { title: 'Easy Crafts for Kids', videoId: 'bOXZGMsLbYI', channel: 'Art for Kids Hub' },
    ],
  },
  'art-concepts': {
    patterns: ['art-feelings', 'art-supplies', 'arts-tool-names', 'arts-texture-words', 'arts-texture-hunt', 'arts-art-', 'arts-famous-painters', 'arts-storytelling-art', 'arts-shadow-puppets', 'arts-puppet-show', 'arts-dance-', 'arts-drama-acting', 'arts-costume-design', 'arts-folk-art', 'arts-photography', 'creative-storytelling', 'feelings-through-art', 'art-appreciation', 'art-techniques', 'art-around-world', 'architecture-basics', 'arts-architecture-basics', 'animation-basics', 'arts-animation-concepts', 'nature-photography', 'sound-effects', 'symmetry-art', 'music-tempo', 'music-with-body', 'arts-dance-styles'],
    title: 'Art & Creativity',
    helpText: 'Art comes in many forms - painting, music, dance, and drama! Artists throughout history have used creativity to share ideas and feelings.',
    emoji: '🎪',
    youtubeVideos: [
      { title: 'Art History for Kids', videoId: 'PXYeARRFDk0', channel: 'Art for Kids Hub' },
    ],
  },
};

/**
 * Find the best matching help topic for an activity.
 * @param {Object} activity - Activity object with at least an `id` property
 * @param {string} domainId - Domain ID (letters, math, science, social, motor, arts)
 * @returns {{ title: string, helpText: string, emoji: string, youtubeVideos: Array } | null}
 */
export function getHelpForActivity(activity, domainId) {
  if (!activity || !activity.id) return null;

  const activityId = activity.id;

  // 1. Exact match on topic key
  if (HELP_TOPICS[activityId]) {
    return HELP_TOPICS[activityId];
  }

  // 2. Find best pattern match (longest matching pattern wins)
  let bestMatch = null;
  let bestLength = 0;

  for (const [, topic] of Object.entries(HELP_TOPICS)) {
    for (const pattern of topic.patterns) {
      if (activityId.startsWith(pattern) || activityId.includes(pattern)) {
        if (pattern.length > bestLength) {
          bestLength = pattern.length;
          bestMatch = topic;
        }
      }
    }
  }

  return bestMatch;
}
