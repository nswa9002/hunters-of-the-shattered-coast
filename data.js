// Hunters of the Shattered Coast — playbook data (28 playbooks).
// Original 12 converted from the first Monster of the Week pack; new 16 from the consolidated 2025 pack.
// Mechanics are faithful reskins into fantasy / pirate-lord terms. No server, no build step.
const PLAYBOOKS = [
 {
  "id": "foretold",
  "name": "The Foretold",
  "orig": "Chosen",
  "group": "original",
  "quote": "Your birth was sung in prophecy. You alone can end the Pirate Lord — and if you fall, the Coast falls with you.",
  "look": "Weathered / youthful / haunted / regal face · Blazing, sorrowful, starry, unblinking eyes · Pilgrim's garb, admiral's coat, salt-stained finery, humble robes",
  "ratings": [
   "Charm+2 Cool-1 Sharp+1 Tough+2 Weird-1",
   "Charm-1 Cool+2 Sharp+1 Tough+2 Weird-1",
   "Charm+1 Cool+2 Sharp+1 Tough+1 Weird-1",
   "Charm-1 Cool+1 Sharp+2 Tough-1 Weird+2",
   "Charm+1 Cool+2 Sharp-1 Tough-1 Weird+2"
  ],
  "luck": "",
  "features": [
   {
    "title": "Your fate & fated weapon",
    "text": "How fate found you (pick one): nightmares and visions; a mad prophet named you; an ancient order raised you in secret; the Pirate Lord himself came for you as a child; the drowned bell rang your name. Build your fated weapon: form (pick 1) — staff (1-harm hand/close), haft (2-harm hand heavy), grip-and-blade (1-harm hand balanced), chain (1-harm hand area). Add three edges: long, heavy, magic, silver, fire, holy, far-reaching, quick. Choose a material: star-iron, drowned gold, dragon bone, living coral. Gear: protective garb worth 1-armour, if you wish, plus your fated weapon."
   }
  ],
  "moves": [
   {
    "name": "Plaything of Fate",
    "text": "At the start of each voyage, roll +Weird. On 10+ the Chronicler reveals a true, useful detail of what is coming. On 7–9, a vague omen. On a miss, something ill is coming — for you.",
    "fixed": true
   },
   {
    "name": "Here for a Reason",
    "text": "Name the deed fate demands of you, agreed with the Chronicler. While you pursue it, you cannot die: the worst fate deals you is capture, ruin or a terrible wound. Once it is done, this protection ends.",
    "fixed": true
   },
   {
    "name": "The Grand Entrance",
    "text": "Arrive in a scene at the perfect moment and all eyes turn to you: take +1 forward, and one enemy's attention is yours alone.",
    "fixed": false
   },
   {
    "name": "Devastating",
    "text": "When you fight, you may deal +1 harm, and your blows smash through doors, shields and rigging alike.",
    "fixed": false
   },
   {
    "name": "Unbowed",
    "text": "You suffer 1 less harm from any blow, and pain never stops you finishing what you started.",
    "fixed": false
   },
   {
    "name": "Dutiful Heart",
    "text": "When port folk or crew look to you for hope, roll +Charm to steady them: on a hit, they hold fast and aid you; on 10+, one joins your cause outright.",
    "fixed": false
   }
  ],
  "pick": 2,
  "gear": "Protective garb worth 1-armour, if you wish · Your fated weapon (built above)",
  "history": "Close kin — say exactly how. / Fated to be your mentor — say how you know. / They will betray you, says the prophecy — do they know? / You saved them at the cost fate demanded — say what it cost. / They stand between you and your doom.",
  "improvements": "+1 Charm (max +3) · +1 Tough (max +3) · +1 Cool (max +2) · +1 Weird (max +2) · Another Foretold move · Gain a company of sworn followers"
 },
 {
  "id": "cutpurse",
  "name": "The Cutpurse",
  "orig": "Crooked",
  "group": "original",
  "quote": "“Aye, I've worked every dock on the Coast. A bit of smuggling, a bit of lifting, a bit of worse. Now I lift for the hunt.”",
  "look": "Sly / scarred / pretty / weather-beaten face · Calculating, darting, laughing, cold eyes · Dock rat's rags, merchant's finery, dark leathers, naval coat (stolen)",
  "ratings": [
   "Charm+2 Cool+1 Sharp+1 Tough-1 Weird 0",
   "Charm+1 Cool+1 Sharp+2 Tough 0 Weird-1",
   "Charm+2 Cool-1 Sharp+2 Tough 0 Weird-1",
   "Charm+1 Cool+2 Sharp 0 Tough+1 Weird-1",
   "Charm 0 Cool+1 Sharp+1 Tough+2 Weird-1"
  ],
  "luck": "",
  "features": [
   {
    "title": "Your old trade (pick one)",
    "text": "Smuggler of cursed cargo. / Harbour thief and lock-picker. / Press-gang runner who sold sailors to ships — including, once, his. / Forger of charts and letters of marque. / Fence for the Pirate Lord's own loot, until you saw whose it was."
   },
   {
    "title": "Gear — pick three",
    "text": "Boarding axe (2-harm hand messy) · Hand crossbow (2-harm close reload quiet) · Short bow (2-harm close/far quiet) · Rapier (2-harm hand precise) · Throwing knives (1-harm close many) · Armoured coat (1-armour hidden)"
   }
  ],
  "moves": [
   {
    "name": "Found Property",
    "text": "You “found” a magical trinket and kept it (pick one): a warding amulet (1-armour, magic, recharges at dawn), a lucky charm (spend it as one luck point, once), a stolen spellbook (+1 forward to work sorcery when studied), a skeleton key (opens any lock, even sealed by sorcery), a whispering imp-stone (answers one yes/no question a day, lies when bored).",
    "fixed": false
   },
   {
    "name": "Dockside Bully",
    "text": "Use Tough instead of Charm to persuade someone when your persuasion is a threat.",
    "fixed": false
   },
   {
    "name": "Second Story",
    "text": "When you break into a guarded place, roll +Sharp. On 10+ pick three, on 7–9 pick two: no alarm raised, no trace left, you are in and out in moments, you find something extra worth stealing.",
    "fixed": false
   },
   {
    "name": "Friends in Low Places",
    "text": "Name a fence, smuggler or gaoler in any port. Once per voyage, they owe you: goods, gossip, a hidden berth or a blind eye.",
    "fixed": false
   },
   {
    "name": "Slippery",
    "text": "When pursuers close in, roll +Cool: on a hit you are simply gone; on 7–9 you leave something — or someone — behind.",
    "fixed": false
   },
   {
    "name": "Crew Boss",
    "text": "You run a small gang of dockside lads and lasses (name them) who fetch, carry, watch and lie for you — badly paid, fiercely loyal, easily frightened.",
    "fixed": false
   }
  ],
  "pick": 3,
  "gear": "Boarding axe (2-harm hand messy) · Hand crossbow (2-harm close reload quiet) · Short bow (2-harm close/far quiet) · Rapier (2-harm hand precise) · Throwing knives (1-harm close many) · Armoured coat (1-armour hidden)",
  "history": "You stole something precious from them — do they know? / They sprang you from the gaol — what did you promise? / You sold them out once, cheap. They forgave you. Mostly. / They are your only honest friend. / You owe the Pirate Lord's fence a fortune, together.",
  "improvements": "+1 Sharp (max +3) · +1 Charm (max +3) · +1 Cool (max +2) · +1 Tough (max +2) · Another Cutpurse move · A safehouse in every major port"
 },
 {
  "id": "blessed",
  "name": "The Blessed",
  "orig": "Divine",
  "group": "original",
  "quote": "I am the light and the sword, sent by the powers above to defend the meek. All darkness fears me, for I am its end.",
  "look": "Human, marked by grace, touched by glory · Blazing, placid, starry, sorrowful eyes · Pilgrim's rags, temple whites, weathered crusader's garb, plain fisherfolk clothes",
  "ratings": [
   "Charm+1 Cool+1 Sharp 0 Tough+2 Weird+1",
   "Charm+2 Cool 0 Sharp-1 Tough+2 Weird+1",
   "Charm 0 Cool+2 Sharp+1 Tough+1 Weird+1",
   "Charm+1 Cool-1 Sharp+2 Tough+1 Weird+1",
   "Charm-1 Cool+1 Sharp 0 Tough+2 Weird+2"
  ],
  "luck": "",
  "features": [
   {
    "title": "Your mission (pick one)",
    "text": "End the Pirate Lord's patron — the thing beneath the waves that feeds him. / Carry the harbour bell to the isle where it must be rung. / Redeem him: he was once of your order. / Guard one hunter in this company, though they must never know why. / Rebuild the drowned shrine in every port he has burned."
   },
   {
    "title": "Gear — pick two, plus a holy symbol",
    "text": "Longsword (2-harm hand messy) · War hammer (2-harm hand heavy holy) · Spear (2-harm hand/close) · Mail shirt (1-armour) · Shield (1-armour, carried) · Blessed blade (2-harm hand holy silver)"
   }
  ],
  "moves": [
   {
    "name": "Voice from Above",
    "text": "At the start of each voyage, roll +Weird. On 10+ your patrons set you a simple task and you may ask one Search for Clues question freely. On 7–9 the task is hard. On a miss, the task is terrible. Refuse or fail it, and this move sleeps until you atone.",
    "fixed": false
   },
   {
    "name": "Soothe",
    "text": "Speak softly for a few breaths and calm panic, rage or terror in anyone who can hear you — though what frightened them has not gone away.",
    "fixed": false
   },
   {
    "name": "Lay On Hands",
    "text": "Your touch closes wounds and lifts sickness. Lay hands and roll +Weird: on 10+ heal 2 harm or a disease; on 7–9 heal 1 and take the pain's echo yourself; on a miss the affliction turns its face to you.",
    "fixed": false
   },
   {
    "name": "Smite the Wicked",
    "text": "Your weapon counts as holy, and deals +1 harm to the cursed, the undead and those who have sworn to the drowned god.",
    "fixed": false
   },
   {
    "name": "Cast Out",
    "text": "Present your holy symbol and command an unclean spirit, curse or haunting to depart. Roll +Weird: on a hit it obeys for now; on 10+ it is banished entirely.",
    "fixed": false
   },
   {
    "name": "Never Falter",
    "text": "When terror, pain or sorcery would stop you, roll +Cool: on a hit, you carry on untouched in spirit; your body may still pay.",
    "fixed": false
   }
  ],
  "pick": 3,
  "gear": "Longsword (2-harm hand messy) · War hammer (2-harm hand heavy holy) · Spear (2-harm hand/close) · Mail shirt (1-armour) · Shield (1-armour, carried) · Blessed blade (2-harm hand holy silver)",
  "history": "Your patron marked them as significant — say how. / You healed them when no one else could — or would. / They doubt the gods, loudly, in your hearing. / You fought side by side against the drowned dead. / They carry a darkness your order would burn out.",
  "improvements": "+1 Tough (max +3) · +1 Weird (max +3) · +1 Cool (max +2) · +1 Charm (max +2) · Another Blessed move · A shrine and sanctuary of your own"
 },
 {
  "id": "lorekeeper",
  "name": "The Lorekeeper",
  "orig": "Expert",
  "group": "original",
  "quote": "I have given my life to studying the sea's dark history. I know his habits, his havens, his hungers. Knowledge is my cutlass.",
  "look": "Lined / scarred / thoughtful / ancient face · Sharp, tired, ink-stained, far-seeing eyes · Old-fashioned scholar's robes, practical travelling clothes, a cartographer's many pockets",
  "ratings": [
   "Charm 0 Cool+1 Sharp+2 Tough 0 Weird+1",
   "Charm+1 Cool 0 Sharp+2 Tough-1 Weird+2",
   "Charm-1 Cool+2 Sharp+2 Tough 0 Weird 0",
   "Charm+1 Cool+1 Sharp+2 Tough+1 Weird-1",
   "Charm 0 Cool-1 Sharp+2 Tough+1 Weird+1"
  ],
  "luck": "",
  "features": [
   {
    "title": "Your haven — pick three",
    "text": "Chart room: +1 forward to search for clues about voyages and places. · Forbidden library: +1 forward to work sorcery prepared from its tomes. · Workshop: tools to mend, forge and tinker. · Healing ward: beds and herbs; the wounded recover here. · Hidden cove: your ship berths unseen. · Watchful servants / old crew. · Warded vault for cursed things."
   },
   {
    "title": "Gear — pick three hunter's tools",
    "text": "Silver dagger (2-harm hand silver) · Cold-iron blade (2-harm hand iron) · Blessed knife (2-harm hand holy) · Crossbow (2-harm close/far reload) · Sun-oil flasks (2-harm close fire) · Staff of rowan (1-harm hand warding)"
   }
  ],
  "moves": [
   {
    "name": "Read About This",
    "text": "Roll +Sharp instead of +Cool to keep your nerve when the danger is something you have studied — which is most dangers.",
    "fixed": false
   },
   {
    "name": "Often Right",
    "text": "When a hunter asks your counsel and follows it, they take +1 ongoing while they follow it, and you mark experience.",
    "fixed": false
   },
   {
    "name": "Prepared Mind",
    "text": "When you search for clues, on a miss you may instead recall one relevant fact from your studies — true, but incomplete.",
    "fixed": false
   },
   {
    "name": "The Weakness",
    "text": "You are the company's living index of the Pirate Lord's lore. Once per voyage, name a fact about him, his fleet or his curse that you “remember reading”: the Chronicler makes it true, with one sting in it.",
    "fixed": false
   },
   {
    "name": "Dark Past",
    "text": "You once served, studied under, or sailed with the enemy. Name how. It gives you +1 to read his captains and havens — and gives the Chronicler a hold to make it cost you.",
    "fixed": false
   },
   {
    "name": "Field Chirurgeon",
    "text": "With your kit and a quiet hour, treat a hunter's wounds: roll +Sharp to heal 1 harm, or stabilise the dying without sorcery.",
    "fixed": false
   }
  ],
  "pick": 2,
  "gear": "Silver dagger (2-harm hand silver) · Cold-iron blade (2-harm hand iron) · Blessed knife (2-harm hand holy) · Crossbow (2-harm close/far reload) · Sun-oil flasks (2-harm close fire) · Staff of rowan (1-harm hand warding)",
  "history": "They came to you broken by a curse; you lifted it — mostly. / You taught them to read the old charts. / They stole a book from your library and never returned it. / You have studied their bloodline. They do not know what you found. / They guard your haven when you sail.",
  "improvements": "+1 Sharp (max +3) · +1 Weird (max +3) · +1 Cool (max +2) · +1 Charm (max +2) · Another Lorekeeper move · Add two options to your haven"
 },
 {
  "id": "chart-reader",
  "name": "The Chart-Reader",
  "orig": "Flake",
  "group": "original",
  "quote": "Every wreck, every ransom, every drowned bell — it is all one chart, and I can see the lines between the isles. Can you not?",
  "look": "Wild / gaunt / cheerful / exhausted face · Eyes that never quite rest, ink under the nails · Chart-tubes and string, too many pockets, a coat covered in chalk marks",
  "ratings": [
   "Charm+1 Cool-1 Sharp+2 Tough 0 Weird+1",
   "Charm 0 Cool+1 Sharp+2 Tough-1 Weird+1",
   "Charm-1 Cool+2 Sharp+2 Tough 0 Weird 0",
   "Charm+2 Cool 0 Sharp+2 Tough-1 Weird 0",
   "Charm+1 Cool 0 Sharp+1 Tough+1 Weird+1"
  ],
  "luck": "",
  "features": [
   {
    "title": "Gear — one honest weapon, two hidden ones",
    "text": "Honest: crossbow (2-harm close/far reload) · long bow (2-harm far quiet) · war bow (3-harm far loud-of-creak) · short sword (2-harm hand). Hidden (pick two): boot dagger · sleeve knife · garrotte · poisoned needle (quiet, slow)."
   }
  ],
  "moves": [
   {
    "name": "Connect the Wrecks",
    "text": "At the start of each voyage, study the pattern behind events and roll +Sharp. On 10+ hold 3, on 7–9 hold 1. Spend hold to ask the Chronicler: Is this person tied to his fleet? Where will he strike next? What is this clue really part of? Who aboard can be turned?",
    "fixed": false
   },
   {
    "name": "Suspicious Mind",
    "text": "When port folk lie to you — harbourmasters, merchants, smiling officials — you always know. Not why. But you know.",
    "fixed": false
   },
   {
    "name": "The Missing Piece",
    "text": "When you search for clues and get to ask a question, you may also ask: What here does not belong? The answer is always worth the asking.",
    "fixed": false
   },
   {
    "name": "See It Coming",
    "text": "You have a sailor's sense for ambush. When his cutthroats spring a trap on the company, roll +Sharp: on a hit you shout a warning in time — everyone takes +1 forward; on 10+ you spotted it early enough to turn the trap on them.",
    "fixed": false
   },
   {
    "name": "Against All Sense",
    "text": "Once per voyage, declare a wild theory about the Pirate Lord's plan. If the table laughs, mark experience. If it proves true, take +1 forward every time it saves the company.",
    "fixed": false
   },
   {
    "name": "Sneaky",
    "text": "When you slip somewhere unseen — a flagship's cabin, a smuggler's hold — roll +Cool instead of the rating called for.",
    "fixed": false
   }
  ],
  "pick": 3,
  "gear": "Honest: crossbow (2-harm close/far reload) · long bow (2-harm far quiet) · war bow (3-harm far loud-of-creak) · short sword (2-harm hand). Hidden (pick two): boot dagger · sleeve knife · garrotte · poisoned needle (quiet, slow).",
  "history": "They are tied into it all — you have a chart proving it. Show them? / They humoured your theory once, in front of the wrong people. / You warned them about a wreck and they did not listen. / They are the only one who reads your charts without laughing. / You saw their name in his cipher. You have not told them. Yet.",
  "improvements": "+1 Sharp (max +3) · +1 Weird (max +2) · +1 Cool (max +2) · +1 Charm (max +2) · Another Chart-Reader move · A network of informants in the ports"
 },
 {
  "id": "sworn",
  "name": "The Sworn",
  "orig": "Initiate",
  "group": "original",
  "quote": "Since the first ships sailed, my order has stood between the Coast and the dark below it. We know the sea's evils. We hold the line.",
  "look": "Hardened / tattooed / scarred / serene face · Stern, kind, haunted, burning eyes · Order's garb with its sigil, travelling leathers, robes cut for fighting",
  "ratings": [
   "Charm+1 Cool+1 Sharp 0 Tough+2 Weird 0",
   "Charm+2 Cool 0 Sharp+1 Tough+1 Weird 0",
   "Charm 0 Cool+2 Sharp+1 Tough+1 Weird 0",
   "Charm+1 Cool-1 Sharp 0 Tough+2 Weird+1",
   "Charm-1 Cool+1 Sharp+2 Tough+1 Weird 0"
  ],
  "luck": "",
  "features": [
   {
    "title": "Your order — pick two strengths, one flaw",
    "text": "Strengths: fighting monks of the harbour shrines; keepers of the forbidden charts; wealthy and well-armed; beloved by port folk; spies in every fleet. Flaws: hidebound and slow; riddled with his gold; sworn to secrets that endanger you; the order is dying, and knows it."
   },
   {
    "title": "Gear — pick three",
    "text": "Order blade (2-harm hand, sigil-marked) · Trident (2-harm hand/close) · Long bow (2-harm far) · Reinforced garb (1-armour) · Silver chain (1-harm hand area silver) · Old war banner (+1 to steady allies)"
   }
  ],
  "moves": [
   {
    "name": "In Good Standing",
    "text": "If your order favours you, at the start of each voyage roll +Charm. On 10+ they send useful word or aid. On 7–9 they set you a task within the voyage — do it, and the aid follows. On a miss, you are in disgrace: no aid, and word travels.",
    "fixed": true
   },
   {
    "name": "Mentor",
    "text": "Name your mentor in the order. Send word by raven and roll +Sharp: on 10+ a full, true answer returns in time. On 7–9 choose: the answer is slow, or you owe the order a favour. On a miss, your question stirs trouble.",
    "fixed": false
   },
   {
    "name": "Apprentice",
    "text": "Name your apprentice (a bystander the Chronicler plays). Eager, promising, and always exactly where the danger is worst. When they aid you, take +1 forward.",
    "fixed": false
   },
   {
    "name": "Ancient Fighting Arts",
    "text": "Your order's training turns your hands and any simple weapon into a hunter's tools (2-harm hand), and you take +1 to guard another.",
    "fixed": false
   },
   {
    "name": "Sanctuary",
    "text": "The order's houses, shrines and lighthouse chapels open to the company in any port — beds, healing and silence, unless you are in disgrace.",
    "fixed": false
   },
   {
    "name": "Forbidden Knowledge",
    "text": "Your order keeps lore it does not share. Once per voyage, ask the Chronicler one question about the Pirate Lord or the drowned god. The answer is true — and asking marks you.",
    "fixed": false
   }
  ],
  "pick": 3,
  "gear": "Order blade (2-harm hand, sigil-marked) · Trident (2-harm hand/close) · Long bow (2-harm far) · Reinforced garb (1-armour) · Silver chain (1-harm hand area silver) · Old war banner (+1 to steady allies)",
  "history": "Your order sheltered them when the fleet came hunting. / They refused the order's oath, to your face. / You trained together as novices, once. / The order has marked them for watching — say why you have not reported them. / They saved your apprentice's life.",
  "improvements": "+1 Tough (max +3) · +1 Charm (max +3) · +1 Cool (max +2) · +1 Sharp (max +2) · Another Sworn move · Rise in your order's ranks"
 },
 {
  "id": "cursed",
  "name": "The Cursed",
  "orig": "Monstrous",
  "group": "original",
  "quote": "Half of me belongs to the deep. I fight every day to spend it on the right side — his side is the other one.",
  "look": "Almost human / weathered by the deep / quietly wrong face · Dark, luminous, sorrowful, hungry eyes · Clothes that hide the signs, sailor's garb, a drowned officer's coat",
  "ratings": [
   "Charm-1 Cool+1 Sharp 0 Tough+2 Weird+2",
   "Charm+1 Cool 0 Sharp-1 Tough+2 Weird+2",
   "Charm 0 Cool+2 Sharp 0 Tough+1 Weird+2",
   "Charm-1 Cool+1 Sharp+2 Tough 0 Weird+2",
   "Charm+2 Cool 0 Sharp 0 Tough+1 Weird+1"
  ],
  "luck": "",
  "features": [
   {
    "title": "Your nature (pick one)",
    "text": "Drowned-and-returned; child of a sea hag; were-shark or selkie-kin; living figurehead, carved and woken; heir of the drowned god's bloodline. Were you born to it, or made? And were you always fighting to be good — or did you change sides?"
   },
   {
    "title": "Gear — one sailor's weapon, if you wish",
    "text": "Cutlass (2-harm hand) · Hand crossbow (2-harm close reload) · Great knife (1-harm hand) · Harpoon (2-harm close, barbed)"
   }
  ],
  "moves": [
   {
    "name": "Undying",
    "text": "You do not age or sicken, and every harm you suffer is reduced by 1. Salt water knits you; fresh water burns.",
    "fixed": false
   },
   {
    "name": "Unnatural Allure",
    "text": "Roll +Weird instead of +Charm to persuade — your voice carries the tide in it.",
    "fixed": false
   },
   {
    "name": "Natural Weapons",
    "text": "(pick one more each time). Claws and teeth (2-harm hand messy); a crushing grip (2-harm hand, grapples); a drowning song (close, area, victims must keep their nerve or walk to you); spines or a stinging tail (2-harm hand, poison).",
    "fixed": false
   },
   {
    "name": "Unholy Speed",
    "text": "You move like the tide coming in: cross any deck, cliff or rigging in a breath, and take +1 when you keep your nerve to escape.",
    "fixed": false
   },
   {
    "name": "Speak with the Deep",
    "text": "Drowned things, sea beasts and cursed crews will parley with you — as kin. What they ask in return is the hard part.",
    "fixed": false
   },
   {
    "name": "The Hunger",
    "text": "Name what your nature craves. When you deny it, take +1 forward. When you feed, heal 2 harm — and the Chronicler holds 1 to make the feeding matter later.",
    "fixed": false
   },
   {
    "name": "Illuminated \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Ask the Hidden Patrons for aid, roll +Weird. On 10+, they reveal a key fact, clue or technique that will help you. On 7-9, they need you to complete a task for them first \u2014 once it is done, they reveal it. On a miss, their reply is terrible, garbled, or dangerously wrong. On 12+, you may ask one follow-up question the Chronicler will answer honestly.",
    "fixed": false
   },
   {
    "name": "Past Lives \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Channel your previous incarnations: pose your question and roll +Weird. On 10+, a past life has something useful \u2014 ask the Chronicler two questions from the list. On 7-9, ask one. On a miss, a past life takes over for a while. On 12+, a past life knows exactly what you were after \u2014 ask one listed question and one free-form question, and take +1 ongoing while acting on the answers. Questions: What did a past life discover about ___? How did a past life deal with ___? What important hidden secret can a past life show me the way to? What did a past life learn too late to help them? What does a past life advise me to do now?",
    "fixed": false
   },
   {
    "name": "Sensitive \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Open your mind to the unseen, roll +Weird. On 10+, you gain a definite impression (a vision, a tangible aura, an overheard thought) about something important. On 7-9, a hazy impression. On a miss, your mind makes contact with something dangerous. On 12+, as for 10+, plus one follow-up question the Chronicler will answer honestly.",
    "fixed": false
   },
   {
    "name": "Empath \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Open your mind to feel the emotions of something right in front of you, roll +Weird. On 10+, a clear impression of their emotional state and intentions; take +1 forward when acting on it. On 7-9, a hazy impression. On a miss, your mind is overwhelmed with emotion. On 12+, as for 10+, plus one follow-up question the Chronicler will answer honestly. You can use it on anything with emotions \u2014 the less human they are, the less safe it is. If the emotions are especially strong or alien, you may need to keep your nerve first.",
    "fixed": false
   },
   {
    "name": "No Limits \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Push your body past its limits, roll +Weird. On 10+, your body obeys your will, to the limits of physical possibility, for a moment. On 7-9, you do it but choose one: suffer 1-harm, take -1 forward, or rest right now. On a miss, something goes horribly wrong. On 12+, you can keep acting at your body's limits for 30 seconds. 'Physical possibility' means conceivably possible for a human \u2014 lift a cart, leap a wagon, punch through a door \u2014 not lift a ship or fly.",
    "fixed": false
   },
   {
    "name": "Telekinesis \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Fling something with your mind, roll +Weird. On 10+, you move it: choose two options and mark 1-harm. On 7-9, you move it but it hurts: choose one option and mark 2-harm. On a miss, something goes horribly wrong. Options: something is held fast; something is hurt (2-harm smash); something catches fire; you fling something bigger than a person; you keep it basically under your control; you suffer 1 less harm. On 12+, choose three options, and you may also choose: something explodes (3-harm close fire area messy); something implodes (3-harm close crush); lots of stuff flies under your control; you have perfect, precise control. By default you can move something smaller than a person, with little control, and not hard enough to hurt anything.",
    "fixed": false
   },
   {
    "name": "Trust Your Gut \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Consult your instincts about what to do next, roll +Weird. On 10+, the Chronicler will tell you where you should go \u2014 wherever that is, it will be important; take +1 ongoing on the way. On 7-9, a general direction; take +1 forward as you explore. On a miss, your instincts lead you into danger. On 12+, the Chronicler also tells you about one important thing you should investigate further.",
    "fixed": false
   },
   {
    "name": "Strange Craft \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery (the weird-science move, reskinned). Create or adapt a device to analyse or deal with strangeness: say what it will do and roll +Weird. On 10+, pick two requirements; on 7-9, pick one and the Chronicler picks a second; on a miss, something goes horribly wrong \u2014 you can still create it, but the Chronicler picks three requirements. On 12+, take +1 ongoing when operating the device. Requirements: it needs a rare and/or weird material; it won't be very reliable; it requires huge amounts of power or fuel; it will take a long time to get working; it won't work exactly as intended; you'll need help beyond your company to finish it.",
    "fixed": false
   }
  ],
  "pick": 2,
  "gear": "Cutlass (2-harm hand) · Hand crossbow (2-harm close reload) · Great knife (1-harm hand) · Harpoon (2-harm close, barbed)",
  "history": "You lost control once and nearly killed them — how did they stop you? / They tried to end you, and you proved your heart — what convinced them? / You saved them from another of your kind. / You are bound to them by an old sea-oath. / The Pirate Lord offered you a place. They know. Nobody else does.",
  "improvements": "+1 Weird (max +3) · +1 Tough (max +3) · +1 Cool (max +2) · +1 Charm (max +2) · Another Cursed move · Another natural weapon"
 },
 {
  "id": "commoner",
  "name": "The Commoner",
  "orig": "Mundane",
  "group": "original",
  "quote": "You heard the stories where the sea only troubles wizards and heroes? Aye. Me neither. I keep a tavern. I sail with legends. I cope.",
  "look": "Open / tired / cheerful / stubborn face · Kind, shrewd, laughing, worried eyes · Working clothes, an apron full of useful things, a coat borrowed from a hero",
  "ratings": [
   "Charm+2 Cool+1 Sharp+1 Tough 0 Weird-1",
   "Charm+2 Cool 0 Sharp+2 Tough 0 Weird-1",
   "Charm+1 Cool+2 Sharp 0 Tough+1 Weird-1",
   "Charm+1 Cool+1 Sharp+1 Tough+1 Weird-1",
   "Charm 0 Cool+2 Sharp+1 Tough+2 Weird-1"
  ],
  "luck": "",
  "features": [
   {
    "title": "Gear — two everyday weapons, and transport",
    "text": "Ship's gaff or boat hook (2-harm hand, reach) · Kitchen cleaver (1-harm hand) · Wood axe (2-harm hand heavy) · Hunting bow (2-harm far) · Heavy frypan (1-harm hand, a legend in its own right). Transport: your mule and cart / fishing smack / sturdy rowboat."
   }
  ],
  "moves": [
   {
    "name": "Always the One in Trouble",
    "text": "When another hunter guards you, they mark experience. Whenever his crew captures you, you mark experience. It happens a lot. You have made a talent of it.",
    "fixed": false
   },
   {
    "name": "Oops",
    "text": "Tell the Chronicler you want to stumble onto something important. You will find something genuinely useful — though not always for the problem in front of you.",
    "fixed": false
   },
   {
    "name": "The Face Folk Trust",
    "text": "Sailors, servants and port folk talk to you as one of their own. Take +1 to persuade port folk, and they never take you for a spy, a tax collector or a hero.",
    "fixed": false
   },
   {
    "name": "What Would a Hero Do?",
    "text": "When you copy something you have seen a companion do — a spell's words, a duelist's trick, a captain's bluff — roll +Cool. On a hit, it works, once, gloriously. On 7–9, it works with a twist nobody wanted.",
    "fixed": false
   },
   {
    "name": "Heart of the Hearth",
    "text": "A hot meal, a dry bed and a listening ear, provided by you, heals 1 harm for the whole company and clears one frightened or shaken condition. Needs an hour and a fire.",
    "fixed": false
   },
   {
    "name": "Slippery When Ordinary",
    "text": "Curses, scrying and curse-senses slide off you: the Pirate Lord's sorcery cannot find you unless you make yourself remarkable.",
    "fixed": false
   }
  ],
  "pick": 3,
  "gear": "Ship's gaff or boat hook (2-harm hand, reach) · Kitchen cleaver (1-harm hand) · Wood axe (2-harm hand heavy) · Hunting bow (2-harm far) · Heavy frypan (1-harm hand, a legend in its own right). Transport: your mule and cart / fishing smack / sturdy rowboat.",
  "history": "Close relations — say exactly how. / You keep their home, shop or tavern running between voyages. / They saved your life the first time the fleet came. / You nursed them back from the brink, with soup and stubbornness. / You are the reason they cannot retire, and they love you for it.",
  "improvements": "+1 Charm (max +3) · +1 Sharp (max +2) · +1 Cool (max +2) · +1 Tough (max +2) · Another Commoner move · A move from another playbook — you learned by watching"
 },
 {
  "id": "quartermaster",
  "name": "The Quartermaster",
  "orig": "Professional",
  "group": "original",
  "quote": "Strange work, hunting a pirate lord for a living wage. Still — the Company pays, the Company equips, and I keep the Company's books.",
  "look": "Chiselled / scarred / neat / weary face · Measuring, cool, bored, kind eyes · Company livery worn over good armour, a clerk's precision, a captain's bearing",
  "ratings": [
   "Charm 0 Cool+2 Sharp+1 Tough+1 Weird 0",
   "Charm+1 Cool+2 Sharp+1 Tough 0 Weird 0",
   "Charm-1 Cool+2 Sharp 0 Tough+2 Weird 0",
   "Charm+1 Cool+1 Sharp+2 Tough 0 Weird-1",
   "Charm 0 Cool+1 Sharp 0 Tough+2 Weird+1"
  ],
  "luck": "",
  "features": [
   {
    "title": "Your patrons (pick one)",
    "text": "The Crown's Admiralty, hunting him for pride and prize-money. / A merchant guild whose tribute fleets he bleeds. / An insurance brotherhood tired of paying for his wrecks. / A temple fleet sworn to sink his flagship. Their aid is real. So is their ledger: every favour is written down, and red lines (pick two with the Chronicler) may never be crossed."
   },
   {
    "title": "Gear — pick three, Company-issue",
    "text": "Fine cutlass (2-harm hand, balanced) · Heavy crossbow (3-harm far reload slow) · Breastplate (2-armour, Company-marked) · Pike (2-harm hand/close) · Signal flags and spyglass · Surgeon's kit and strong spirits"
   }
  ],
  "moves": [
   {
    "name": "Deal with the Company",
    "text": "When you request aid, gear or forgiveness from your patrons, roll +Sharp. On 10+ it is granted cleanly. On 7–9 it is granted — with conditions, delays or a witness attached. On a miss, they grant something else entirely, and note your failure.",
    "fixed": true
   },
   {
    "name": "Bottle It Up",
    "text": "Take up to +3 on a keep-your-nerve roll, whenever you choose. For each +1 taken, the Chronicler holds 1, spendable later to give you −1 at the worst professional moment — a superior watching, a patron's cargo at risk.",
    "fixed": false
   },
   {
    "name": "Requisition",
    "text": "Once per voyage, draw on Company stores: fine weapons, charts, letters of credit, a fast courier boat or a squad of marines for one scene. Someone senior reviews the cost afterwards.",
    "fixed": false
   },
   {
    "name": "Unfazeable",
    "text": "Take +1 to keep your nerve, always. Boarding actions, burning ships and angry admirals are, professionally, Tuesdays.",
    "fixed": false
   },
   {
    "name": "Company Surgeon",
    "text": "Your field kit and training stabilise any wounded hunter and heal 1 harm with ten quiet minutes. In your patrons' infirmaries, double it.",
    "fixed": false
   },
   {
    "name": "Leave No One Behind",
    "text": "When you guard another, you may spend hold to carry them clear of danger entirely — out of the fight, off the ship, beyond pursuit.",
    "fixed": false
   }
  ],
  "pick": 3,
  "gear": "Fine cutlass (2-harm hand, balanced) · Heavy crossbow (3-harm far reload slow) · Breastplate (2-armour, Company-marked) · Pike (2-harm hand/close) · Signal flags and spyglass · Surgeon's kit and strong spirits",
  "history": "The Company assigned you to watch them — say whether you still file reports. / They saved a Company ship you were sworn to lose. / You recruited them, and vouched for them with your name. / They owe the Company a debt you quietly keep rescheduling. / You served together before the Company bought your swords.",
  "improvements": "+1 Cool (max +3) · +1 Sharp (max +2) · +1 Tough (max +2) · +1 Charm (max +2) · Another Quartermaster move · Promotion — and a patron's ear"
 },
 {
  "id": "battle-mage",
  "name": "The Battle-Mage",
  "orig": "Spell-Slinger",
  "group": "original",
  "quote": "Fight fire with fire — and lightning, and the wind off a drowning sea. His captains have sorcerers. Now so do we.",
  "look": "Sharp / serene / wild / aged-before-time face · Sparking, storm-grey, mismatched, glowing eyes · Battle robes and leathers, a staff scarred by its own lightning, sea-charms at every seam",
  "ratings": [
   "Charm 0 Cool+1 Sharp+1 Tough 0 Weird+2",
   "Charm-1 Cool+1 Sharp 0 Tough+1 Weird+2",
   "Charm+1 Cool 0 Sharp+1 Tough-1 Weird+2",
   "Charm 0 Cool+2 Sharp 0 Tough 0 Weird+2",
   "Charm-1 Cool 0 Sharp+2 Tough+1 Weird+1"
  ],
  "luck": "",
  "features": [
   {
    "title": "Combat magic",
    "text": "Your war-spells are weapons: combine a base with an effect. Bases: blast (2-harm close magic), bolt (2-harm far magic), ball (2-harm close area magic), wall of force or flame (1-harm close area warding). Effects: fire, lightning, frost, wind, entangle. When you fight with them, roll +Weird instead of +Tough; the Chronicler may make you keep your nerve first when casting under fire."
   },
   {
    "title": "Tools and techniques your magic needs (pick three)",
    "text": "Precise gestures. / Words of power, spoken aloud. / A focus — staff, wand, orb or blade. / Powders, salts and sea-charms (consumed). / Stillness: you must plant your feet and breathe. / Blood or pain, a drop at a time. Missing a needed tool makes casting ugly; missing two makes it reckless."
   },
   {
    "title": "Gear — pick one backup",
    "text": "Heirloom sword (2-harm hand messy) · Ritual dagger (1-harm hand) · Old ship's pistol-crossbow (2-harm close reload) · Ward-stone (1-armour, once per voyage)"
   }
  ],
  "moves": [
   {
    "name": "Trained for War",
    "text": "With two of your three tools ready, you may ignore the third when you work sorcery.",
    "fixed": false
   },
   {
    "name": "Arcane Reputation",
    "text": "Name three powers of the Coast — a temple fleet, a smugglers' court, a drowned crew that still parleys. They know your name and respect it: take +1 to persuade them, and they will ask your aid before your enemies'.",
    "fixed": false
   },
   {
    "name": "Shield of Sorcery",
    "text": "Hold a ward around yourself: 1-armour, magic. While it holds, you cannot be surprised by sorcery.",
    "fixed": false
   },
   {
    "name": "Counterspell",
    "text": "When enemy magic is loosed nearby, roll +Weird: on 10+ it shatters harmlessly; on 7–9 it shatters, and so does your composure — take −1 forward.",
    "fixed": false
   },
   {
    "name": "The Third Eye",
    "text": "You see magic, curses and the drowned as clearly as rigging. Ask the Chronicler freely: What sorcery is at work here, and whose is it?",
    "fixed": false
   },
   {
    "name": "Illuminated \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Ask the Hidden Patrons for aid, roll +Weird. On 10+, they reveal a key fact, clue or technique that will help you. On 7-9, they need you to complete a task for them first \u2014 once it is done, they reveal it. On a miss, their reply is terrible, garbled, or dangerously wrong. On 12+, you may ask one follow-up question the Chronicler will answer honestly.",
    "fixed": false
   },
   {
    "name": "Past Lives \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Channel your previous incarnations: pose your question and roll +Weird. On 10+, a past life has something useful \u2014 ask the Chronicler two questions from the list. On 7-9, ask one. On a miss, a past life takes over for a while. On 12+, a past life knows exactly what you were after \u2014 ask one listed question and one free-form question, and take +1 ongoing while acting on the answers. Questions: What did a past life discover about ___? How did a past life deal with ___? What important hidden secret can a past life show me the way to? What did a past life learn too late to help them? What does a past life advise me to do now?",
    "fixed": false
   },
   {
    "name": "Sensitive \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Open your mind to the unseen, roll +Weird. On 10+, you gain a definite impression (a vision, a tangible aura, an overheard thought) about something important. On 7-9, a hazy impression. On a miss, your mind makes contact with something dangerous. On 12+, as for 10+, plus one follow-up question the Chronicler will answer honestly.",
    "fixed": false
   },
   {
    "name": "Empath \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Open your mind to feel the emotions of something right in front of you, roll +Weird. On 10+, a clear impression of their emotional state and intentions; take +1 forward when acting on it. On 7-9, a hazy impression. On a miss, your mind is overwhelmed with emotion. On 12+, as for 10+, plus one follow-up question the Chronicler will answer honestly. You can use it on anything with emotions \u2014 the less human they are, the less safe it is. If the emotions are especially strong or alien, you may need to keep your nerve first.",
    "fixed": false
   },
   {
    "name": "No Limits \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Push your body past its limits, roll +Weird. On 10+, your body obeys your will, to the limits of physical possibility, for a moment. On 7-9, you do it but choose one: suffer 1-harm, take -1 forward, or rest right now. On a miss, something goes horribly wrong. On 12+, you can keep acting at your body's limits for 30 seconds. 'Physical possibility' means conceivably possible for a human \u2014 lift a cart, leap a wagon, punch through a door \u2014 not lift a ship or fly.",
    "fixed": false
   },
   {
    "name": "Telekinesis \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Fling something with your mind, roll +Weird. On 10+, you move it: choose two options and mark 1-harm. On 7-9, you move it but it hurts: choose one option and mark 2-harm. On a miss, something goes horribly wrong. Options: something is held fast; something is hurt (2-harm smash); something catches fire; you fling something bigger than a person; you keep it basically under your control; you suffer 1 less harm. On 12+, choose three options, and you may also choose: something explodes (3-harm close fire area messy); something implodes (3-harm close crush); lots of stuff flies under your control; you have perfect, precise control. By default you can move something smaller than a person, with little control, and not hard enough to hurt anything.",
    "fixed": false
   },
   {
    "name": "Trust Your Gut \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Consult your instincts about what to do next, roll +Weird. On 10+, the Chronicler will tell you where you should go \u2014 wherever that is, it will be important; take +1 ongoing on the way. On 7-9, a general direction; take +1 forward as you explore. On a miss, your instincts lead you into danger. On 12+, the Chronicler also tells you about one important thing you should investigate further.",
    "fixed": false
   },
   {
    "name": "Strange Craft \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery (the weird-science move, reskinned). Create or adapt a device to analyse or deal with strangeness: say what it will do and roll +Weird. On 10+, pick two requirements; on 7-9, pick one and the Chronicler picks a second; on a miss, something goes horribly wrong \u2014 you can still create it, but the Chronicler picks three requirements. On 12+, take +1 ongoing when operating the device. Requirements: it needs a rare and/or weird material; it won't be very reliable; it requires huge amounts of power or fuel; it will take a long time to get working; it won't work exactly as intended; you'll need help beyond your company to finish it.",
    "fixed": false
   }
  ],
  "pick": 3,
  "gear": "Heirloom sword (2-harm hand messy) · Ritual dagger (1-harm hand) · Old ship's pistol-crossbow (2-harm close reload) · Ward-stone (1-armour, once per voyage)",
  "history": "You dueled beside them against his weather-witch. / They carried you out when a spell went wrong — what did it cost them? / You taught them one small, true magic. / They distrust sorcery since the fleet's curses — say what you do about it. / Your master died hunting him. They were there.",
  "improvements": "+1 Weird (max +3) · +1 Cool (max +2) · +1 Sharp (max +2) · +1 Tough (max +2) · Another Battle-Mage move · A new war-spell base or effect"
 },
 {
  "id": "touched",
  "name": "The Touched",
  "orig": "Spooky",
  "group": "original",
  "quote": "I can do things other folk cannot. There is a price — I have not paid it in full, and the tide is coming to collect.",
  "look": "Young / old / ageless / salt-bleached face · Eyes that see too much, one clouded, one bright · Castaway's clothes, shrine-keeper's garb, gloves always, even to eat",
  "ratings": [
   "Charm+1 Cool 0 Sharp 0 Tough-1 Weird+2",
   "Charm 0 Cool+1 Sharp+1 Tough 0 Weird+2",
   "Charm-1 Cool 0 Sharp+2 Tough 0 Weird+2",
   "Charm+2 Cool-1 Sharp 0 Tough 0 Weird+2",
   "Charm 0 Cool+2 Sharp-1 Tough+1 Weird+1"
  ],
  "luck": "",
  "features": [
   {
    "title": "Your dark side (pick three tags)",
    "text": "Voices from below. / The tide calls you home. / Rage like a squall. / Visions you cannot unsee. / Hunger for drowned gold. / Cold hands, cold heart. / Something rides you in dreams. The Chronicler invokes a tag when your gift is used: you must indulge it, or mark harm as it tears at you."
   },
   {
    "title": "Gear — pick two",
    "text": "Silver needle-knives (1-harm hand silver, many) · Driftwood staff (1-harm hand warding) · Short bow (2-harm close/far) · A charm against your own gift (it aches — that is how you know it works)"
   }
  ],
  "moves": [
   {
    "name": "Mind to Mind",
    "text": "Read another's thoughts and place words in their mind. You may search for clues, read a room or persuade without speaking a word — though folk notice the wrongness of it afterwards.",
    "fixed": false
   },
   {
    "name": "Tune In to the Deep",
    "text": "Open your mind to one of his captains, creatures or cursed crew and roll +Weird. On 10+ hold 3, on 7–9 hold 1; on a miss, it knows you are listening. Spend hold to ask: Where is it? What does it most fear or want? Who will it strike next? What is it hiding?",
    "fixed": false
   },
   {
    "name": "Hex",
    "text": "When you work sorcery on a foe, you may also lay one hex: they stumble at the worst moment, their weapon fails once, or ill luck dogs their next roll (−1 forward).",
    "fixed": false
   },
   {
    "name": "Premonitions",
    "text": "At the start of each voyage, roll +Weird: on a hit, a flash of the voyage's worst moment — the Chronicler shows you the image, not the meaning. On 10+, take +1 forward when it arrives, ready for it.",
    "fixed": false
   },
   {
    "name": "Sight Beyond Sight",
    "text": "See the drowned, the cursed and things hidden by sorcery, always. It means they can see you, too.",
    "fixed": false
   },
   {
    "name": "Hush",
    "text": "Still a room: bells muffle, voices die, oars make no splash. While you concentrate, the company moves in sorcerous silence.",
    "fixed": false
   },
   {
    "name": "Illuminated \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Ask the Hidden Patrons for aid, roll +Weird. On 10+, they reveal a key fact, clue or technique that will help you. On 7-9, they need you to complete a task for them first \u2014 once it is done, they reveal it. On a miss, their reply is terrible, garbled, or dangerously wrong. On 12+, you may ask one follow-up question the Chronicler will answer honestly.",
    "fixed": false
   },
   {
    "name": "Past Lives \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Channel your previous incarnations: pose your question and roll +Weird. On 10+, a past life has something useful \u2014 ask the Chronicler two questions from the list. On 7-9, ask one. On a miss, a past life takes over for a while. On 12+, a past life knows exactly what you were after \u2014 ask one listed question and one free-form question, and take +1 ongoing while acting on the answers. Questions: What did a past life discover about ___? How did a past life deal with ___? What important hidden secret can a past life show me the way to? What did a past life learn too late to help them? What does a past life advise me to do now?",
    "fixed": false
   },
   {
    "name": "Sensitive \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Open your mind to the unseen, roll +Weird. On 10+, you gain a definite impression (a vision, a tangible aura, an overheard thought) about something important. On 7-9, a hazy impression. On a miss, your mind makes contact with something dangerous. On 12+, as for 10+, plus one follow-up question the Chronicler will answer honestly.",
    "fixed": false
   },
   {
    "name": "Empath \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Open your mind to feel the emotions of something right in front of you, roll +Weird. On 10+, a clear impression of their emotional state and intentions; take +1 forward when acting on it. On 7-9, a hazy impression. On a miss, your mind is overwhelmed with emotion. On 12+, as for 10+, plus one follow-up question the Chronicler will answer honestly. You can use it on anything with emotions \u2014 the less human they are, the less safe it is. If the emotions are especially strong or alien, you may need to keep your nerve first.",
    "fixed": false
   },
   {
    "name": "No Limits \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Push your body past its limits, roll +Weird. On 10+, your body obeys your will, to the limits of physical possibility, for a moment. On 7-9, you do it but choose one: suffer 1-harm, take -1 forward, or rest right now. On a miss, something goes horribly wrong. On 12+, you can keep acting at your body's limits for 30 seconds. 'Physical possibility' means conceivably possible for a human \u2014 lift a cart, leap a wagon, punch through a door \u2014 not lift a ship or fly.",
    "fixed": false
   },
   {
    "name": "Telekinesis \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Fling something with your mind, roll +Weird. On 10+, you move it: choose two options and mark 1-harm. On 7-9, you move it but it hurts: choose one option and mark 2-harm. On a miss, something goes horribly wrong. Options: something is held fast; something is hurt (2-harm smash); something catches fire; you fling something bigger than a person; you keep it basically under your control; you suffer 1 less harm. On 12+, choose three options, and you may also choose: something explodes (3-harm close fire area messy); something implodes (3-harm close crush); lots of stuff flies under your control; you have perfect, precise control. By default you can move something smaller than a person, with little control, and not hard enough to hurt anything.",
    "fixed": false
   },
   {
    "name": "Trust Your Gut \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Consult your instincts about what to do next, roll +Weird. On 10+, the Chronicler will tell you where you should go \u2014 wherever that is, it will be important; take +1 ongoing on the way. On 7-9, a general direction; take +1 forward as you explore. On a miss, your instincts lead you into danger. On 12+, the Chronicler also tells you about one important thing you should investigate further.",
    "fixed": false
   },
   {
    "name": "Strange Craft \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery (the weird-science move, reskinned). Create or adapt a device to analyse or deal with strangeness: say what it will do and roll +Weird. On 10+, pick two requirements; on 7-9, pick one and the Chronicler picks a second; on a miss, something goes horribly wrong \u2014 you can still create it, but the Chronicler picks three requirements. On 12+, take +1 ongoing when operating the device. Requirements: it needs a rare and/or weird material; it won't be very reliable; it requires huge amounts of power or fuel; it will take a long time to get working; it won't work exactly as intended; you'll need help beyond your company to finish it.",
    "fixed": false
   }
  ],
  "pick": 3,
  "gear": "Silver needle-knives (1-harm hand silver, many) · Driftwood staff (1-harm hand warding) · Short bow (2-harm close/far) · A charm against your own gift (it aches — that is how you know it works)",
  "history": "You read their mind once, uninvited — and kept what you found. / They pulled you from the sea when the gift first took you. / Your voices name them, nightly, by a name they do not use. / They alone know what the price will be. / You warned them of a death. It came for someone else.",
  "improvements": "+1 Weird (max +3) · +1 Charm (max +2) · +1 Cool (max +2) · +1 Sharp (max +2) · Another Touched move · Shed one dark-side tag — at a price"
 },
 {
  "id": "bereaved",
  "name": "The Bereaved",
  "orig": "Wronged",
  "group": "original",
  "quote": "He took everyone I loved. Back then I could not fight. I studied. I trained. Now I will cleanse this coast of him and his.",
  "look": "Grieved / grim / weathered / ageless-with-grief face · Sad, icy, burning, untouchable eyes · Mourning blacks adapted for war, a dead captain's coat, armour that has never been polished since",
  "ratings": [
   "Charm-1 Cool+1 Sharp+1 Tough+2 Weird 0",
   "Charm 0 Cool+2 Sharp 0 Tough+2 Weird 0",
   "Charm-1 Cool 0 Sharp+2 Tough+2 Weird-1",
   "Charm+1 Cool+1 Sharp 0 Tough+2 Weird 0",
   "Charm 0 Cool+1 Sharp+1 Tough+1 Weird+1"
  ],
  "luck": "",
  "features": [
   {
    "title": "Gear — one signature weapon, two practical",
    "text": "Signature (pick one): a great boarding axe (3-harm hand heavy messy); the harbour bell-hammer (3-harm hand heavy holy); a matched pair of cutlasses (2-harm hand, +1 when both are drawn); a harpoon gun of your own making (3-harm far reload barbed). Practical (pick two): cutlass (2-harm hand); heavy crossbow (3-harm far reload); boarding pike (2-harm hand/close); mourning armour (1-armour). Your mount or boat: a black-sailed skiff, a warhorse that fears nothing."
   }
  ],
  "moves": [
   {
    "name": "I Know My Prey",
    "text": "Take +1 ongoing whenever you knowingly investigate, pursue or fight the Pirate Lord's own — his captains, his crews, his cursed servants: the ones who did it, or their kind.",
    "fixed": true
   },
   {
    "name": "Berserk",
    "text": "No amount of harm stops you before the current fight ends. The Chronicler may not use harm moves to take you out of a fight you have chosen.",
    "fixed": false
   },
   {
    "name": "What Cannot Be Taken",
    "text": "When his people threaten what you have left — this company, this ship, one named soul — take +2 to guard them, and mark experience when you bleed doing it.",
    "fixed": false
   },
   {
    "name": "Relentless",
    "text": "When the trail goes cold, roll +Sharp: on a hit you find the thread again — a survivor, a wreck, a loose tongue. On 7–9 it costs you a night, a fortune or a friend's patience.",
    "fixed": false
   },
   {
    "name": "Tool of Vengeance",
    "text": "Your signature weapon deals +1 harm to his captains and creatures — and you cannot be disarmed of it while vengeance is unfinished. Neither can you set it down. Ever.",
    "fixed": false
   },
   {
    "name": "Fury Sworn",
    "text": "Name the oath you swore over the graves. While you keep it, take +1 to keep your nerve against fear and sorcery. Break it, and lose 1 luck to the sea.",
    "fixed": false
   }
  ],
  "pick": 2,
  "gear": "Signature (pick one): a great boarding axe (3-harm hand heavy messy); the harbour bell-hammer (3-harm hand heavy holy); a matched pair of cutlasses (2-harm hand, +1 when both are drawn); a harpoon gun of your own making (3-harm far reload barbed). Practical (pick two): cutlass (2-harm hand); heavy crossbow (3-harm far reload); boarding pike (2-harm hand/close); mourning armour (1-armour). Your mount or boat: a black-sailed skiff, a warhorse that fears nothing.",
  "history": "They were there the day it happened — ask what they remember that you cannot. / They pulled you from the wreckage, or the bottle. / You have sworn to protect them as you could not protect yours. / They counsel mercy, and you are trying to hear them. / They lost people to him too — different names, same graves.",
  "improvements": "+1 Tough (max +3) · +1 Sharp (max +2) · +1 Cool (max +2) · +1 Weird (max +2) · Another Bereaved move · Name a second signature weapon"
 },
 {
  "id": "philosopher",
  "name": "The Natural Philosopher",
  "orig": "Action Scientist",
  "group": "new",
  "quote": "You may call it sorcery, but all that means is we do not understand it yet. Soon we shall discover what makes it tick — and then I shall keep it in my workshop. Perfectly contained.",
  "look": "Human, clockwork-limbed, or strange-blooded · Calculating, curious, observant, friendly, calm, visionary eyes · Alchemist's coat, scholar's tweeds, engineer's leathers, casual clothes, messy clothes",
  "ratings": [
   "Charm-1 Cool+1 Sharp+2 Tough+1 Weird 0",
   "Charm+2 Cool-1 Sharp+2 Tough 0 Weird-1",
   "Charm-1 Cool 0 Sharp+2 Tough-1 Weird+2",
   "Charm 0 Cool+1 Sharp+2 Tough-1 Weird+1",
   "Charm 0 Cool+1 Sharp+2 Tough+1 Weird-1"
  ],
  "luck": "When you spend a point of Luck, some device or mechanism near you will soon malfunction, break, or burst — what exactly is the Chronicler's to say.",
  "features": [
   {
    "title": "Area of Study — pick one focus",
    "text": "Physics & the Heavens: you sense when something bends the laws of the world. When you search for clues, you may also ask: Which way is the source? Is it still or changing? What instrument would tell me more? · Beasts & Alchemy: when you examine a strange substance, ask the Chronicler its source — living or not, and whether it is mundane, cursed, from beyond the seas, or from another world. · Minds & Motives: when talking to someone and weighing their motives, roll +Sharp. On 10+ the Chronicler tells you if they are truly human and whether they are ally, port folk, villain, cutthroat, or cursed. On 7-9 you sense something off, but not what. On a miss you reveal too much of yourself. · Mechanisms & Runes: when you work a sealed lock, ward, or strange device, roll +Cool. On 10+ you open or change it (within its limits). On 7-9 it takes longer or something unexpected happens. On a miss it all goes wrong in the worst way. · Violence: you may roll +Sharp instead of +Tough to fight. When you make a studied strike, deal +1 harm or take +1 forward. · Craft & Engineering: mending takes far less time than expected, and you need not have every proper tool. You may also combine any two devices into one — it has all the abilities and tags of both, the size of the larger, and you may add, delete, or change one tag. · The Stars: +1 ongoing with ships, charts, and navigation by the heavens. You have the run of an observatory and its instruments."
   }
  ],
  "moves": [
   {
    "name": "Test Hypothesis",
    "text": "When you test a likely explanation from evidence gathered, roll +Sharp. The Chronicler tells you if you are on the right track, missing vital evidence, or on the wrong track. On 10+ you can trust the answer. On 7-9 the answer is honest, but you wasted time or the testing destroyed some evidence. On a miss, the answer has nothing to do with the facts.",
    "fixed": false
   },
   {
    "name": "Sabotage",
    "text": "When you quickly break a complicated device, roll +Sharp. On 10+ it is broken — your choice whether quietly or beyond repair. On 7-9 it is broken, but not hard to mend, and you made a ruckus. On a miss, the worst possible thing happens — usually an explosion.",
    "fixed": false
   },
   {
    "name": "Oblivious to Danger",
    "text": "You are immune to all fear-based moves and powers, and never need to keep your nerve to resist fear from any source.",
    "fixed": false
   },
   {
    "name": "Doors of Perception",
    "text": "When you open your mind with draughts, meditation, or ritual, roll +Weird. On 10+ pick two effects; on 7-9 pick one, but your mind is foggy and confused; on a miss you are lost in altered states. Effects: speak with someone or something you normally could not; see what is normally invisible — forces, ghosts, incursions, sorcery; ask one Search for Clues question; clarity: +1 Cool, Sharp, or Weird for an hour or so (max +3).",
    "fixed": false
   },
   {
    "name": "Fieldwork",
    "text": "When you put yourself in danger to test a hypothesis, take +1 forward. When you prove the hypothesis true or false, mark experience.",
    "fixed": false
   }
  ],
  "pick": 2,
  "gear": "Toolkits for your science, engineering, and analysis. Strange weapons (pick two): lightning rod (3-harm close loud area lightning, needs charging); storm-caster (3-harm close/far messy, needs charging); sun-lens (2-harm close/far quiet, needs charging); net launcher (0-harm close entangling); scalpel (1-harm intimate/hand); force knife (2-harm hand, needs charging); sleeping draught crossbow (1-harm close/far sedating); stun-ray (0-harm close sedating); clockwork hound (2-harm far autonomous); alchemist's fire-rod (3-harm close fire). Protective gear (pick one): sealed plague suit; chemical-resistant coat; engineer's coveralls; diving suit (sealed, climate-proof); alchemist's armour (2-armour heavy, needs charging). A weapon that needs charging is liable to run dry at the worst moment, like a bow without arrows.",
  "history": "Relations, most likely distant — say how. / Academic colleagues once — decide where and when. / On-again, off-again romance — decide if it is off or on right now. / Friends since a grand experiment together — decide which rival savant you defeated. / Just companions, at ease together after the hunt. / They once helped you deal with an experiment that got out of hand — say what it was, and let them decide how they helped. / They were there when your career changed from scholar to hunter — decide how they helped when you fought your first cursed thing. / You used your craft to get them out of a jam, and they still owe you — ask what the jam was, then tell them what you did.",
  "improvements": "+1 Sharp (max +3) · +1 Cool (max +2) · +1 Weird (max +2) · +1 Tough (max +2) · Another Natural Philosopher move · A workshop with staff, facilities, and instruments suited to your study · An ally team of fellow savants · A move from another playbook"
 },
 {
  "id": "bard",
  "name": "The Famed Bard",
  "orig": "Celebrity",
  "group": "new",
  "quote": "You would be surprised how many curses get passed between performers. Then again, you might also read the broadsheets.",
  "look": "Athletic, gorgeous, wholesome, distinguished, hyperactive build · Stage face, alluring, characterful, familiar, grim, sensual face · Stage outfit, the costume of your most famous role, casual clothes, fashionable clothes, travelling incognito",
  "ratings": [
   "Charm+2 Cool+1 Sharp-1 Tough 0 Weird+1",
   "Charm+2 Cool 0 Sharp+1 Tough+1 Weird-1",
   "Charm+2 Cool-1 Sharp 0 Tough+2 Weird-1",
   "Charm+1 Cool+2 Sharp+1 Tough-1 Weird 0",
   "Charm+2 Cool 0 Sharp+1 Tough-1 Weird+1"
  ],
  "luck": "When you spend a point of Luck, something from your career comes up — a grand new opportunity, or a threat to one you already have.",
  "features": [
   {
    "title": "Your fame",
    "text": "By default you are a famed stage performer, but you might be famous in any medium — a balladeer, a playwright, a hero of the penny dreadfuls. References to your body of work mean whatever you perform."
   }
  ],
  "moves": [
   {
    "name": "Fakelore",
    "text": "When you use 'facts' learned from your work, roll +Sharp. On 10+ pick two; on 7-9 pick one; on a miss pick two, but one is true and one is not, and you will not learn which until it truly matters. Options: you coincidentally expose a weakness of the foe; you kept a useful prop and can use it now; you do not set yourself up to be attacked; it works for the reason you say it should.",
    "fixed": true
   },
   {
    "name": "Scream Queen",
    "text": "When you make a commotion, roll +Cool. On 10+ you draw all the attention you want. On 7-9 you either attract something you did not want, or do not attract everything you wanted.",
    "fixed": false
   },
   {
    "name": "The Price of Fame",
    "text": "When your career interferes with a hunt or puts someone in harm's way, mark experience. With fans, your fame usually counts as a reason to persuade someone.",
    "fixed": false
   },
   {
    "name": "I Have People",
    "text": "You have friends in high places. When you ask them for help, roll +Charm. On 10+ they are available and helpful — they can fix something, use connections to get past authority, do background research, or get you special information. On 7-9 they will help, but it will take time or you will owe them a favour. On a miss, you offend them.",
    "fixed": false
   },
   {
    "name": "I Do My Own Stunts",
    "text": "You have been hurt on stage enough to know your own injuries. As long as you are conscious, you never go unstable.",
    "fixed": false
   },
   {
    "name": "Disarming",
    "text": "You know how to look harmless. When you dissuade someone or something from hurting you, roll +Charm. On 10+ they hesitate long enough for someone to act. On 7-9 they either hold back or attack someone else.",
    "fixed": false
   },
   {
    "name": "But I Play One on Stage",
    "text": "You have picked up tricks from many trades. Once per session, you may use a move from any playbook not in use, or an alternate Weird move.",
    "fixed": false
   },
   {
    "name": "Acting, My Dear",
    "text": "If you suffer harm that would take you to dying, you ignore it and survive — but you are out of action, presumed dead. Later you reappear as if nothing happened, having played dead or fainted. It may go badly for you if anything takes advantage of your apparent helplessness.",
    "fixed": false
   }
  ],
  "pick": 2,
  "gear": "Copies of your work, posters, ballads, and books, ready to be signed and handed to admirers. A ride (pick one): a painted touring wagon; a fine racing horse; a barely-roadworthy captured war-wagon; a carriage with a driver; a classic old coach; an overpowered warhorse. Normal weapons (pick two): hand crossbow (2-harm close reload loud); heavy crossbow (3-harm close messy); hunting bow (2-harm far loud); short bow (2-harm close loud); great knife (1-harm hand); two-handed saw (2-harm hand heavy messy loud).",
  "history": "A professional relationship — are they your agent, lawyer, bodyguard, assistant, or co-star? / Best rivals — you met competing over something. Was it a hunt or a performance? Decide how it turned out. / The broadsheets caught you out together once — was it a date, or were you hunting? / They knew you before you were famous: a cousin, a fellow student, or just an old friend. / A history of romance with this hunter (with the player's agreement) — how long, and how steady? / They are (or were) your biggest admirer and still keep some memorabilia — ask what their favourite piece is. / They recruited you for your first hunt — what did you hunt, and how did it go? / Your work includes advice that once saved their life — ask what it was.",
  "improvements": "+1 Charm (max +3) · +1 Tough (max +2) · +1 Sharp (max +2) · +1 Cool (max +2) · Another Famed Bard move · An entourage as an ally group · Choose two topics of hidden lore (ghosts, curses, sea-beasts, old rites) and take +1 ongoing when using Fakelore on those topics · A move from another playbook"
 },
 {
  "id": "fae",
  "name": "The Fae-Blooded",
  "orig": "Changeling",
  "group": "new",
  "quote": "Before you start with the awkward talk — do most young folk start growing gills?",
  "look": "Inhuman features, moving hair, strange eyes, weird reflection, distorted shadow · A sound of chimes, a cold aura, a creepy feeling, a soothing presence, rainbow glimmers, a smell of incense · Friendly, alluring, laughing, trustworthy, average, serious, sensual face · Normal, ragged, casual, goth, sporty, work, street, or scholar's clothes",
  "ratings": [
   "Charm+1 Cool-1 Sharp+1 Tough 0 Weird+2",
   "Charm-1 Cool+1 Sharp 0 Tough+1 Weird+2",
   "Charm+1 Cool 0 Sharp-1 Tough+1 Weird+2",
   "Charm 0 Cool+2 Sharp+1 Tough-1 Weird+1",
   "Charm+2 Cool+1 Sharp+1 Tough-1 Weird 0"
  ],
  "luck": "When you spend a point of Luck, something or someone tied to your inhuman heritage or your human upbringing shows up soon.",
  "features": [
   {
    "title": "Unknown Heritage — pick three",
    "text": "Dietary restriction · A hygienic need · An unearned reputation · Erratic power · Strange thoughts · Sensory bombardment · Allergy to ______ · Repulsion from ______ · Attraction to ______ · Obsession with ______. The Chronicler may set obstacles from these tags. Push through or ignore them and things can spiral — you may need to keep your nerve. Or spend time dealing with it, putting the crisis on hold, and mark experience. You always itch to learn about your nature: when you search for clues from a source of hidden knowledge, you may ask 'What do I learn about myself?' as one of your questions. If you learn anything useful about yourself, word spreads among the hidden folk that you are asking."
   }
  ],
  "moves": [
   {
    "name": "Glamour",
    "text": "Your true appearance is plainly inhuman, which makes ordinary dealings with port folk difficult. While calm, you can hold an illusion of humanity. You may drop your glamour and show your true power to turn any roll into a 10 — but your unknown heritage stirs up trouble right away, or soon after.",
    "fixed": true
   },
   {
    "name": "Inhuman Talent",
    "text": "You are naturally skilled with one kind of magic — perhaps plants, ice, illusions, or summer. You have +1 ongoing when you use a basic Weird move with these powers. At the start of each session, hold 2; spend hold for +1 forward on a move your powers can enhance.",
    "fixed": false
   },
   {
    "name": "They Are My People",
    "text": "Once per session, when you guard someone, act as if you rolled a 12. You take +1 forward when you keep your nerve to resist instincts from your heritage, dark urges, or fight-or-flight.",
    "fixed": false
   },
   {
    "name": "Force of Nature",
    "text": "You have a supernatural attack from your heritage — lightning, insect swarms, magical blades, or something else. When you unleash your power, roll +Weird. On any 7+, you summon a 1-harm close weapon for a short time. On 10+ pick two extras; on 7-9 pick one; on a miss the power turns against you. Extras: +1 harm, hand, far, autonomous, distracting, ignore-armour, area, grab, blind, stun.",
    "fixed": false
   },
   {
    "name": "Lockdown",
    "text": "You can stun people with a power like a petrifying gaze, overwhelming illusions, or bewildering moths. When you freeze someone, roll +Weird. On 10+ the target is held for a few minutes, or until something snaps them out of it. On 7-9 they are held only while you focus, or until something snaps them out of it. On a miss, there is a magical backlash. Harming the target always snaps them out of it.",
    "fixed": false
   },
   {
    "name": "Faerie Gossip",
    "text": "You can speak with local spirits and hidden creatures. When you search for clues by questioning these beings, roll +Weird instead of +Sharp, and you may also ask: Is anything affecting the hidden world here? How long has ______ been in the area? When did ______ first arrive?",
    "fixed": false
   },
   {
    "name": "Renewal",
    "text": "You speed the healing of those around you. When companions and allies in your presence recover harm by any means, they recover 1 extra harm.",
    "fixed": false
   },
   {
    "name": "Strange Paths",
    "text": "You can walk between worlds — though you do not know the way well. When you take an otherworld shortcut, roll +Weird. On 10+ you arrive quicker than otherwise possible. On 7-9 you find trouble along the way: you get only partway, meet locals, or save only a little time. On a miss you arrive a little too late, or something blocks the way.",
    "fixed": false
   },
   {
    "name": "Illuminated \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Ask the Hidden Patrons for aid, roll +Weird. On 10+, they reveal a key fact, clue or technique that will help you. On 7-9, they need you to complete a task for them first \u2014 once it is done, they reveal it. On a miss, their reply is terrible, garbled, or dangerously wrong. On 12+, you may ask one follow-up question the Chronicler will answer honestly.",
    "fixed": false
   },
   {
    "name": "Past Lives \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Channel your previous incarnations: pose your question and roll +Weird. On 10+, a past life has something useful \u2014 ask the Chronicler two questions from the list. On 7-9, ask one. On a miss, a past life takes over for a while. On 12+, a past life knows exactly what you were after \u2014 ask one listed question and one free-form question, and take +1 ongoing while acting on the answers. Questions: What did a past life discover about ___? How did a past life deal with ___? What important hidden secret can a past life show me the way to? What did a past life learn too late to help them? What does a past life advise me to do now?",
    "fixed": false
   },
   {
    "name": "Sensitive \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Open your mind to the unseen, roll +Weird. On 10+, you gain a definite impression (a vision, a tangible aura, an overheard thought) about something important. On 7-9, a hazy impression. On a miss, your mind makes contact with something dangerous. On 12+, as for 10+, plus one follow-up question the Chronicler will answer honestly.",
    "fixed": false
   },
   {
    "name": "Empath \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Open your mind to feel the emotions of something right in front of you, roll +Weird. On 10+, a clear impression of their emotional state and intentions; take +1 forward when acting on it. On 7-9, a hazy impression. On a miss, your mind is overwhelmed with emotion. On 12+, as for 10+, plus one follow-up question the Chronicler will answer honestly. You can use it on anything with emotions \u2014 the less human they are, the less safe it is. If the emotions are especially strong or alien, you may need to keep your nerve first.",
    "fixed": false
   },
   {
    "name": "No Limits \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Push your body past its limits, roll +Weird. On 10+, your body obeys your will, to the limits of physical possibility, for a moment. On 7-9, you do it but choose one: suffer 1-harm, take -1 forward, or rest right now. On a miss, something goes horribly wrong. On 12+, you can keep acting at your body's limits for 30 seconds. 'Physical possibility' means conceivably possible for a human \u2014 lift a cart, leap a wagon, punch through a door \u2014 not lift a ship or fly.",
    "fixed": false
   },
   {
    "name": "Telekinesis \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Fling something with your mind, roll +Weird. On 10+, you move it: choose two options and mark 1-harm. On 7-9, you move it but it hurts: choose one option and mark 2-harm. On a miss, something goes horribly wrong. Options: something is held fast; something is hurt (2-harm smash); something catches fire; you fling something bigger than a person; you keep it basically under your control; you suffer 1 less harm. On 12+, choose three options, and you may also choose: something explodes (3-harm close fire area messy); something implodes (3-harm close crush); lots of stuff flies under your control; you have perfect, precise control. By default you can move something smaller than a person, with little control, and not hard enough to hurt anything.",
    "fixed": false
   },
   {
    "name": "Trust Your Gut \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Consult your instincts about what to do next, roll +Weird. On 10+, the Chronicler will tell you where you should go \u2014 wherever that is, it will be important; take +1 ongoing on the way. On 7-9, a general direction; take +1 forward as you explore. On a miss, your instincts lead you into danger. On 12+, the Chronicler also tells you about one important thing you should investigate further.",
    "fixed": false
   },
   {
    "name": "Strange Craft \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery (the weird-science move, reskinned). Create or adapt a device to analyse or deal with strangeness: say what it will do and roll +Weird. On 10+, pick two requirements; on 7-9, pick one and the Chronicler picks a second; on a miss, something goes horribly wrong \u2014 you can still create it, but the Chronicler picks three requirements. On 12+, take +1 ongoing when operating the device. Requirements: it needs a rare and/or weird material; it won't be very reliable; it requires huge amounts of power or fuel; it will take a long time to get working; it won't work exactly as intended; you'll need help beyond your company to finish it.",
    "fixed": false
   }
  ],
  "pick": 2,
  "gear": "Transport (pick one): a fast horse; a skiff; a bicycle of the pedalled sort; an old cart; a warhorse; a wagon; a fine coach in decent condition; a classic coach in poor condition. Weapon (pick one): sporting club (2-harm hand innocuous messy); pocket knife or multitool (1-harm hand useful small); hand crossbow (2-harm close loud); hunting bow (3-harm far loud reload); sledgehammer (2-harm hand messy slow); fire axe (2-harm hand messy heavy); talisman or relic (1-harm close magic ignore-armour). Mementos (pick two): a childhood toy; a scrying ledger; a knapsack; a music box or game device; old portraits; jewellery; a favourite piece of clothing; a journal; letters from home.",
  "history": "They discovered you are not human — ask how they realised, and how (or if) they told you. / You suspect they know more about your heritage than they say — ask if your suspicion is right. / They tried to slay you, but decided you were innocent — or at least not evil. Ask what convinced them. / You see them as your anchor to humanity — ask what example they set. / You are romantically involved with them, or a close relative of theirs — decide the exact relationship. / They are family in every way but blood — decide the details. / They claim you and your people are part of their destiny — ask what they told you, and tell them your reaction. / They see you as a protégé to train for hunting — ask how persistent they are.",
  "improvements": "+1 Weird (max +3) · +1 Cool (max +2) · +1 Sharp (max +2) · +1 Charm (max +2) · Another Fae-Blooded move · An ally, tied to the mortal or the hidden world · Mark Work Sorcery (or your alternate Weird move) as advanced · A move from another playbook"
 },
 {
  "id": "bonded",
  "name": "The Bonded",
  "orig": "Covenant",
  "group": "new",
  "quote": "The blood of the bond is thicker than the water of the womb.",
  "look": "Warrior's build, a trustworthy look, mystic tattoos, grease stains everywhere · Tactical gear, a matching outfit, summoner's robes, a fashionable suit · Exuberant manner, an observant pose, a confident stance",
  "ratings": [
   "Charm+2 Cool-1 Sharp+1 Tough 0 Weird+1",
   "Charm-1 Cool+1 Sharp+2 Tough+1 Weird 0",
   "Charm+1 Cool+2 Sharp 0 Tough+1 Weird-1",
   "Charm 0 Cool+1 Sharp-1 Tough+2 Weird+1",
   "Charm+1 Cool 0 Sharp+1 Tough-1 Weird+2"
  ],
  "luck": "When you spend a point of Luck, an ally needs your help, or needs you to spend some time with them.",
  "features": [
   {
    "title": "The Bond — your knack for keeping allies safe",
    "text": "Once per session, if an ally would be killed, describe how you help them survive and escape. They return, fully or mostly recovered, at the start of the next voyage."
   },
   {
    "title": "Friendship — you start with an ally",
    "text": "Pick a style: Watson — one individual, extra-competent ally. Rolodex — an ally team with varied skills, tending to work alone. Unit — a small group that usually works as a team. Describe your ally — pick one: long-time coworker; loyal retainer; good companion; mutually cursed; a hidden creature; a romantic interest; a friendly employer; something else."
   }
  ],
  "moves": [
   {
    "name": "Get Down!",
    "text": "When you guard someone, you may split the harm suffered with a nearby ally as well as yourself and the person you guard.",
    "fixed": false
   },
   {
    "name": "Fast Friends",
    "text": "When you meet a new being and spend time befriending them, roll +Charm. On 10+ they become your ally. On 7-9 they become your ally until the end of the voyage. On a miss you have offended them. You can gain only one permanent ally per voyage this way (a second 10+ makes them an ally for the rest of the voyage).",
    "fixed": false
   },
   {
    "name": "Smash Cut",
    "text": "Once per voyage, when you reveal you asked an ally to do something for you, describe the task as a flashback and roll +Cool. On 10+ it went off smoothly; the Chronicler describes the results. On 7-9 it was more dangerous or less effective than you hoped. On a miss your allies are in serious danger right now.",
    "fixed": false
   },
   {
    "name": "The Geek in the Chair",
    "text": "Your ally watches and guides you from afar. You may spend 1 hold from Read the Room to warn someone about to suffer harm, preventing 2 harm. You gain +1 forward to Read the Room in each new location.",
    "fixed": false
   },
   {
    "name": "Acolyte",
    "text": "Either one of your existing allies has gained hidden powers, or you have gained a hidden ally. Decide with the Chronicler what powers they have.",
    "fixed": false
   },
   {
    "name": "Who Said I Was Alone?",
    "text": "Once per session, when your ally suddenly appears, treat a miss as if you had rolled a 7-9. Immediate consequences (such as suffering harm) still apply to you, but your ally becomes the focus of attention.",
    "fixed": false
   },
   {
    "name": "Opening Doors",
    "text": "Your allies have their own contacts and circles. Once per session, an ally can arrange a meeting between you and someone they know. You have +1 ongoing to deal with your ally's contacts during this meeting.",
    "fixed": false
   }
  ],
  "pick": 2,
  "gear": "A way to reach your ally (pick one): messenger ravens; a summoning charm; signal flags; a far-speaking relic; a telepathic link; a message charm. A useful item (pick one): a wardrobe of socially fitting clothes; a mail shirt (1-armour); a cutting-edge charting kit; ritual gear; an extensive tool collection. A weapon (pick one): a heavy tool (2-harm hand utility innocuous); a summoned minion (2-harm close autonomous messy); a hand crossbow (2-harm close reload loud); a bag of curses (1-harm close magic ignore-armour); a heavy crossbow (3-harm close messy loud); a hunting bow (2-harm far loud); a sword (2-harm hand magic).",
  "history": "They introduced you to your ally — ask how that happened, and decide what the relationship is now. / The first time you met a cursed thing, they were there — ask whether they were already a veteran. / You introduced them to the hunting life — was it on purpose? Ask how they feel about being dragged into it. / Your ally is a great admirer of this hunter — has your ally approached them? Ask the other hunter if they have noticed. / They are related to your ally — ask what they think of your relationship. / You are always trying to show off in front of them — why? Ask what they think of it. / They shared a harrowing encounter with you and your ally — what detail do you all disagree on?",
  "improvements": "+1 Cool (max +2) · +1 Weird (max +2) · +1 Charm (max +3) · +1 Sharp (max +2) · +1 Tough (max +2) · Another Bonded move · A move from another playbook · You gain a second ally — pick a different style for them · Gain a contact type, as if from the Inquisitor's Naked City"
 },
 {
  "id": "curseeater",
  "name": "The Curse-Eater",
  "orig": "Curse-eater",
  "group": "new",
  "quote": "You cannot always go for the kill. Sometimes a cursed thing is an illness to be cured, not a danger to be destroyed.",
  "look": "Scarification, a birthmark, tattoos, unnatural colouring, a strange mark · Friendly, suspicious, cold, or emotional eyes · Work clothes, practical clothes, street clothes, occult robes",
  "ratings": [
   "Charm+1 Cool+2 Sharp+1 Tough 0 Weird-1",
   "Charm 0 Cool+1 Sharp+2 Tough-1 Weird+1",
   "Charm-1 Cool+2 Sharp+2 Tough-1 Weird 0",
   "Charm-1 Cool+1 Sharp+2 Tough+1 Weird 0",
   "Charm+1 Cool+2 Sharp 0 Tough-1 Weird+1"
  ],
  "luck": "When you spend a point of Luck, you develop a permanent mark tied to one of your consumed magics.",
  "features": [
   {
    "title": "Corruption & Consumed Magic",
    "text": "Corruption track: 7 boxes — when it fills, you become a cursed thing under the Chronicler's control. When you consume cursed magic, you gain corruption and the ability to use some of those powers. Record what the magic was, the power it offers, and the downside it asks of you; the Chronicler provides these, and can confirm whether a curse before you can be consumed. How you consume it (pick one): you lay hands on it and glowing smoke carries the curse away; you ritually eat some part of it; you embrace the cursed thing and spend minutes bonding with it; you hold an amulet against it; something else."
   }
  ],
  "moves": [
   {
    "name": "Devour Evil",
    "text": "When you absorb a curse — from a cursed creature, a phenomenon, a cutthroat, or evil sorcery — roll one die. On 1–3, mark one corruption; on 4–5, mark two; on a 6, mark three. For a creature or cutthroat with half or more of its harm remaining, mark one extra. If you have more corruption than consumed magics, ask the Chronicler to give you a power and downside this curse grants. If the curse was small or short-lived, it is destroyed. If it was strong or long-lasting and you used its weakness, the curse is lifted. Some curses cannot be lifted this way — they are instead greatly reduced in power for a time.",
    "fixed": true
   },
   {
    "name": "Unleash Corruption",
    "text": "When you have marked corruption, you may release a power you have consumed. Say how you use the power and clear one corruption, then choose whether to keep control. Controlled, the power does what you want — erase the consumed magic line, power and downside included. Uncontrolled, the power and downside both activate, and the Chronicler decides how it goes.",
    "fixed": true
   },
   {
    "name": "Devour Harm",
    "text": "Touch someone (or some creature) who is hurt and mark one corruption to completely heal them. Mark corruption equal to half the harm they had suffered.",
    "fixed": false
   },
   {
    "name": "Reach",
    "text": "When you work sorcery, you may choose one of these alternate effects: use Devour Evil at range; use Unleash Corruption at range; learn whether this magic may be devoured, and what the power and downside will be.",
    "fixed": false
   },
   {
    "name": "Curse Whispers",
    "text": "When you search for clues, you may also ask: What sort of curse is this? Where did this curse come from? Is there a curse here that I can consume? If you discover a curse (by any method) matching one you have previously consumed, take +1 forward.",
    "fixed": false
   },
   {
    "name": "Ropes of Fate",
    "text": "You can mystically hold a cursed being or object restrained (range: close). Roll +Cool. On 10+ they are restrained for at least an hour. On 7–9 they are restrained, but choose one: it is not for long, you suffer 1-harm, or unleash corruption. On 6 or less, it is unrestrained and very angry.",
    "fixed": false
   },
   {
    "name": "Feel the Burn",
    "text": "When you unleash corruption, you may clear one extra corruption, but you suffer 2-harm that cannot be reduced by any means.",
    "fixed": false
   },
   {
    "name": "Fortune's Fool",
    "text": "Mark three corruption to gain the effects of spending one Luck. Do not mark a consumed magic.",
    "fixed": false
   },
   {
    "name": "Let It Go",
    "text": "When you have three or more consumed magics marked, you may spend all consumed magics in place of all requirements for Work Sorcery. For great sorcery, the Chronicler will tell you how many consumed magics you can lose in place of each requirement. Keep the corruption.",
    "fixed": false
   }
  ],
  "pick": 2,
  "gear": "Handy gear (pick three): a mystical focus used when eating curses (crystal, amulet, or ring); a pocket knife or multitool (1-harm hand useful small); a bag of occult ingredients and spell reagents; manacles and chains; rope and cord; a medallion of the Society of Curse-Eaters; improvised protective gear (1-armour); a great net; a grimoire of wardings and defences; dowsing rods and a pendulum. Practical weapons (pick two): a cricket bat (1-harm hand innocuous); a collapsible baton (1-harm hand small); a shocking rod (2-harm hand/close stun, crackling); a sleeping-draught rifle (3-harm close sedating); a hand crossbow (2-harm close loud). A vessel (pick one): none; a wagon; an old cart; a cart; a wagon-train.",
  "history": "Friends and confidants — what do you know of each other's fears and secrets? / You saved them from a curse many years ago and have trusted each other since — ask what it was. / You are suspicious of their powers, and wonder if one day you will need to consume a curse from them. / They are suspicious of your powers — ask what they fear about you. / You were both hunting the same cursed thing and argued about killing it versus saving it — decide who won that debate. / Family — what is the relationship, and how does the rest of the family regard you? / On your first hunt together, you unleashed consumed magic and put them in great danger — ask what happened, and how they feel about it now. / They told you that you are fated to consume a curse that threatens the world — ask if they know anything more about what is coming.",
  "improvements": "+1 Sharp (max +3) · +1 Weird (max +2) · +1 Tough (max +2) · +1 Charm (max +2) · Another Curse-Eater move · Make a consumed magic into a permanent custom move (with the group's agreement), then clear it · Clear all corruption without clearing consumed magics — you cannot gain more until you release some · A move from another playbook",
  "trackers": [
   {
    "key": "corruption",
    "label": "Corruption",
    "boxes": 7,
    "note": "Full: you become a cursed thing under the Chronicler's control."
   }
  ]
 },
 {
  "id": "herald",
  "name": "The Herald",
  "orig": "Envoy",
  "group": "new",
  "quote": "I am burdened with glorious purpose.",
  "look": "Slender and shady, tall and imposing, plump and pleasant, gruff and grizzled, alien proportions, timelessly young · Extremely normal, extra limbs, strange eyes, strange implants, a visible halo or aura · Humble clothes, strange garb, clothes of light, clothes of darkness, eccentric clothes",
  "ratings": [
   "Charm+1 Cool+2 Sharp 0 Tough-1 Weird+1",
   "Charm 0 Cool+2 Sharp+1 Tough-1 Weird+1",
   "Charm-1 Cool+2 Sharp+1 Tough+1 Weird 0",
   "Charm+1 Cool+2 Sharp-1 Tough+1 Weird 0",
   "Charm+1 Cool+2 Sharp-1 Tough 0 Weird+1"
  ],
  "luck": "When you spend a point of Luck, your actions come under intense scrutiny, or the Overseers demand something specific and troublesome.",
  "features": [
   {
    "title": "Your Task — pick one",
    "text": "Guide: you are meant to guide people toward a desired end — what is it? · Herald: you are meant to carry instructions to others — what do you teach? · Watcher: you are meant to search for signs of something — what are the signs? · Witness: you are meant to record and observe events — what do you record?"
   },
   {
    "title": "Secret Wisdom",
    "text": "You have received insight from your Task. At the start of each session, roll +Cool. On 10+ hold 2; on 7–9 hold 1; on a miss hold 1, but the Chronicler introduces a cruel choice or terrible truth tied to your Task. Spend hold by your Task: Guide — spend 1 hold to lend aid without being in the same place, or 2 hold to lend aid on a start-of-voyage or start-of-session move. Herald — spend 1 hold to persuade a cursed creature, if it can speak. Watcher — spend 1 hold to guard someone even when you are not in the same place. Witness — spend 1 hold to grant any hunter one question, as if they had just searched for clues."
   },
   {
    "title": "The Overseers",
    "text": "You were sent by a higher power. Their Values (pick two): Order, Freedom, Safety, Compassion, Secrecy, Knowledge, Honesty, Power, Growth, Truth, something else. Your Concerns (pick one): the Overseers' internal politics, cryptic messages, strict rules, an alien perspective, a distant presence, secret motives, purity, narrow focus, the big picture, something else. You have no easy way to contact your Overseers — they are hands-off and esoteric. You can reach out with sorcery; otherwise contact comes at their whim."
   }
  ],
  "moves": [
   {
    "name": "Strangely Normal",
    "text": "When you behave with casual confidence while doing something strange, roll +Charm. On 10+ your odd behaviour is accepted, and gives you an opening to start a longer conversation if you wish. On 7–9 someone grows suspicious and starts a pointed conversation. On a miss someone takes offence.",
    "fixed": false
   },
   {
    "name": "Too Much Has Been Lost",
    "text": "When you research old tales to search for clues, ask one of these as well as your usual questions: What in this record is exaggerated? What is understated? What is manufactured? What is this record missing?",
    "fixed": false
   },
   {
    "name": "The Council Has Made a Decision",
    "text": "When you defy a direct command from the Overseers, hold 2. Spend this hold to turn a rolled move into a 10+ — but the fallout grows worse each time you do.",
    "fixed": false
   },
   {
    "name": "Prime Directive",
    "text": "When the Overseers' Values conflict with what you must do, choose: uphold the Value, or do what you need. You gain +1 ongoing on moves that heighten the conflict. If the ending leaves the Overseers, the hunters, and the port folk all content, mark experience.",
    "fixed": false
   },
   {
    "name": "Servant of the Secret Fire",
    "text": "When you lend aid to another hunter using hidden or strange means, you also gain +1 forward. Once per session, you may use a basic Weird move you do not normally have. If you are not playing with alternate Weird moves, you may instead work sorcery as if you had rolled a 10+.",
    "fixed": false
   },
   {
    "name": "From a Certain Point of View",
    "text": "Your style of cooperation can look dishonest. When you use deceit to persuade port folk or allies, roll +Cool. On 10+ everything goes smoothly. On 7–9 there is collateral damage you did not expect — was the success worth the cost? On a miss, it went badly.",
    "fixed": false
   },
   {
    "name": "No One Listens to Zathras",
    "text": "Once per voyage for each hunter, when you give cryptic advice to another hunter, they may ask the Chronicler 'What have I missed?' If they choose not to, they mark experience.",
    "fixed": false
   }
  ],
  "pick": 2,
  "gear": "Resources (pick one): mysterious financial assets; access to exclusive spaces; messenger devices; diplomatic credentials. A weapon (pick one): a defensive charm (1-harm close magic, 1-armour); a holdout crossbow (2-harm close small); a rebuking touch (1-harm hand holy); a whispered revelation (0-harm intimate stun).",
  "history": "They were the first person you met after receiving your Task — tell them if they witnessed the event itself, and how they reacted. / A family member — ask what surprised them most about how you have changed. / They are somehow integral to your Task — ask why the Overseers are interested in them. / The Overseers have warned you about this hunter — what was the warning? Have you revealed it? / You enjoy every minute you spend with them — decide together what makes you get along so well. / They respect your Task and the work you do — ask if they respect the Overseers as much as the work. / They have always listened to your worries — have you ever taken advantage of their willingness to listen? / You work efficiently together — decide why others think you do not like each other.",
  "improvements": "+1 Cool (max +3) · +1 Weird (max +2) · +1 Charm (max +2) · +1 Sharp (max +2) · Another Herald move · A move from another playbook · Pick a second resource from your gear · The Overseers provide bodyguards — gain an ally or ally team (mortal agents, invisible spirits, clockwork sentinels, or something else) · Change your Task to another option"
 },
 {
  "id": "blade",
  "name": "The Living Blade",
  "orig": "Forged",
  "group": "new",
  "quote": "I was created to be a tool, but I do not want to be stuck that way forever.",
  "look": "Human form: slender, stocky, tall, short, very average · Metal hair, strange colours, odd scent, runic tattoos · Recent fashionable dress, aggressively bland clothes, mismatched clothes. Weapon form: a book, amulet, sword, axe, shield, or crossbow · Silver, concentrated magic, bone, steel, obsidian · Cold, warm, bell chimes, a slight breeze, sadness · Marks: a serial number, a wizard's glyph, a runic inscription, a pictograph",
  "ratings": [
   "Charm+2 Cool+1 Sharp 0 Tough-1 Weird+1",
   "Charm+2 Cool-1 Sharp-1 Tough 0 Weird+2",
   "Charm+1 Cool+1 Sharp 0 Tough-1 Weird+2",
   "Charm+1 Cool-1 Sharp+1 Tough 0 Weird+2",
   "Charm+2 Cool 0 Sharp+1 Tough-1 Weird+1"
  ],
  "luck": "When you spend a point of Luck, your Flaw or Burden comes up.",
  "features": [
   {
    "title": "Dual Nature",
    "text": "You may freely change between your human shape and your weapon shape. You cannot fight in weapon form, but when wielded as a weapon, your bearer deals harm equal to your Weird. Pick your base range (pick one): intimate, close, hand, far. Benefits (pick two): Magic (add the 'magic' tag); Vicious (+1 harm); Precise (+1 harm); Life Drain (add 'life-drain'; you may heal your wielder instead of yourself); Reach (add another range); Defensive (1-armour for your wielder); Sweeping (add 'area'); Elemental (add tags such as fire, wind, lightning, mind, or darkness). Flaw (pick one): conspicuous, unwieldy, distinctive, charging, restricted. Origin — Forging (pick one): you always thought you were human; you gained sentience through the perfection of your maker's craft; you used to be a hidden being; a magical accident created you; you were created to fulfil an obligation; 'You know what? I don't remember.'; something else. Origin — Partnering (pick one): your partner showed great faith and devotion; solved puzzles of wit and wisdom; won your allegiance through power and might; you were created specifically for your partner; your partner swore to perform a task and you are to aid them; you met through sheer luck; something else."
   }
  ],
  "moves": [
   {
    "name": "Partner",
    "text": "Choose another hunter, or create an ally, to be your wielder and partner, then pick two bonds and one burden. The partner can be changed by a great ritual (perhaps a duel or a gift), or if they die. Bonds (pick two): a telepathic link; locational awareness; speaking in each other's name; imitating your partner; something else. Burdens (pick one): emotional bleed-over; a dire curse; separation pains; a covetous seeker; a dread enemy; something else.",
    "fixed": true
   },
   {
    "name": "Tactical Advice",
    "text": "When working closely with your partner, you may pass any +1 ongoing benefits from Read the Room to them. You and your partner also have +1 ongoing to lend aid to each other.",
    "fixed": false
   },
   {
    "name": "My Outlet",
    "text": "You have a hobby that deepens your sense of self — you hope. Once per voyage, when you spend time on your hobby, roll +Cool. On 10+ hold 2; on 7–9 hold 1; on a miss something happens to shake your confidence. Spend 1 hold for +1 forward. Spend 2 hold to raise your level of success: a miss becomes a 7–9, a 7–9 becomes a 10+, and if the move is advanced, a 10+ becomes a 12+.",
    "fixed": false
   },
   {
    "name": "To My Side",
    "text": "You are always ready to magically come to your partner. Roll +Weird and pick one: summon your partner to your position, or the reverse; or switch positions with your partner. On 10+ it happens. On 7–9 one or both of you ends up slightly in the wrong spot, the Chronicler's choice. On a miss you are both scattered and lose contact.",
    "fixed": false
   },
   {
    "name": "Ritual Use",
    "text": "When taking part in great sorcery, pick one: gain +1 ongoing while taking part in the ritual; or your involvement replaces one requirement.",
    "fixed": false
   },
   {
    "name": "Don't Worry About Me",
    "text": "When you neglect your own needs to aid someone, mark experience, and if it is for your partner, take +1 forward. When you assure a hunter who is not your partner that you are fine after suffering harm, they gain +1 forward.",
    "fixed": false
   },
   {
    "name": "Pointing the Way",
    "text": "When you remind someone of their obligations, you take +1 forward to persuade someone. When you read a room, add 'What should we do to keep our promises?' to your list of questions.",
    "fixed": false
   }
  ],
  "pick": 1,
  "gear": "A sentimental object (pick one): a memento of a past partner you felt strongly about; a mysterious brand or mark that appears on both your forms; a gift given to you by a small child; a notebook you write poetry in; a favourite novel. A human-form defence (pick one): a natural warrior (1-harm intimate/hand); a wrestler (2-harm intimate/hand, grab, forceful); a dagger (1-harm intimate/hand); a holdout crossbow (1-harm close small).",
  "history": "They awakened your dormant form — did you appear as a human or a weapon first? Decide how you each reacted. / They know things about your legend that you do not — tell them a secret you did not know yourself, and ask if they have revealed it to you. / Prophecies say they are connected to your past — have you told them? Decide together what the connection is. / They always treat you as a person, whatever form you are in — what do you think of that? Ask why they do it. / They engineered the meeting between you and your current partner — ask why they did that. / They seem to think your weapon form is a curse you need freeing from — do you agree? / You share interests or hobbies — decide together what they are. / You were created to kill them — them, or their people. Tell them why you turned against this purpose, and ask if they know about it.",
  "improvements": "+1 Charm (max +3) · +1 Weird (max +3) · +1 Tough (max +2) · +1 Sharp (max +2) · +1 Cool (max +2) · Another Living Blade move · A move from another playbook · Pick another benefit for your weapon form · You can count your current wielder as your partner for your moves, as well as your chosen partner"
 },
 {
  "id": "inquisitor",
  "name": "The Inquisitor",
  "orig": "Gumshoe",
  "group": "new",
  "quote": "You will not understand this… When I take a case, I am supposed to do something about it. You are supposed to do something about it whether you like it or not. You have got to pay for what you have done. Yes, I will have some bad nights, but I will still have myself.",
  "look": "Angelic, unshaven, handsomely devilish, world-weary, sly, streetwise, quiet, knowing, watchful, merry, obvious ex-watchman, or hunted face · Nondescript clothes, tailored clothes and dark lenses, vintage clothes, fashionable clothes, a wide-brimmed hat and long coat, island casual, rider's leathers",
  "ratings": [
   "Charm+2 Cool 0 Sharp+1 Tough 0 Weird 0",
   "Charm+2 Cool 0 Sharp+1 Tough+1 Weird-1",
   "Charm+1 Cool 0 Sharp+2 Tough+1 Weird-1",
   "Charm+1 Cool-1 Sharp+2 Tough 0 Weird+1",
   "Charm+2 Cool+1 Sharp+1 Tough 0 Weird-1"
  ],
  "luck": "When you spend a point of Luck, your next ordinary case will turn out to be a voyage for your company after all — and the Pirate Lord's people will focus their attention on you.",
  "features": [
   {
    "title": "The Inquisitor's Code — pick one sentence, with the Chronicler",
    "text": "Example codes: Murders must be punished. Cursed things must be destroyed. Innocents must be saved. Laws must be enforced. Evil must be exposed. The weak must be protected from the powerful. Your Code defines you. Any time you break it, you lose all Code-tied moves (The Postman Always Rings Twice, The Long Goodbye) and the ability to spend Luck points — until the next voyage, or until you make amends. While you keep the Code, folk sense your sincerity: you gain +1 ongoing to persuade someone, and no hidden, cursed, or demonic power or item may possess or charm you."
   }
  ],
  "moves": [
   {
    "name": "Occult Confidential",
    "text": "The first time in each voyage that you observe one of his captains, cutthroats, or cursed phenomena in action, you may ask one question from the Search for Clues list.",
    "fixed": true
   },
   {
    "name": "The Naked City",
    "text": "You have personal contacts wherever you go. Pick four contact types: academics, accountants, artists, tavern keepers, clergy, conspiracy theorists, builders, courts, organised criminals, street criminals, cultists, engineers, spies, players and bards, chirurgeons, fringe scholars, code-breakers, journalists, lawyers, mechanics, heralds, healers, soldiers, the morgue, the occult, the local watch, the Crown's watch, politicians, prisons, private guards, property developers, stage magicians, technologists, hauliers. You can call on them for information (+1 to one Search for Clues roll) or small favours — though there may be a small cost. For greater help, the Chronicler decides the price case by case.",
    "fixed": true
   },
   {
    "name": "The Postman Always Rings Twice",
    "text": "Twice per voyage — as long as you follow your Code — you may reroll a roll.",
    "fixed": false
   },
   {
    "name": "The Long Goodbye",
    "text": "You cannot die with an open case. You suffer all harm as normal, but your death is postponed until you have completed or abandoned the case, or you break your Code (then all bets are off).",
    "fixed": false
   },
   {
    "name": "Talk Your Way In",
    "text": "When you talk your way into a guarded place, roll +Charm. On 10+ pick three, on 7–9 pick two, on a miss pick one: you leave no trace of what you searched; you find what you wanted; you find something else that is important; you do not anger anyone; you are not recognised.",
    "fixed": false
   },
   {
    "name": "Out of the Past",
    "text": "You have a friend in the watch who will do you great favours. Get in touch when you need to redirect the watch's attention, get warning of planned operations, or read the watch's files. You now owe them — expect them to collect on it soon.",
    "fixed": false
   },
   {
    "name": "Asphalt Jungle",
    "text": "You heal faster than most. Any time your harm is healed, heal an extra point. You are immune to the Chronicler's 0-harm and 1-harm harm moves — when they would apply, ignore them.",
    "fixed": false
   },
   {
    "name": "Hacker with a Dragon Tattoo",
    "text": "When you break into a sealed ledger, ward, or coded device, roll +Sharp. On 10+ pick two, on 7–9 pick one: you leave no traces; you learn something important; you can leave false information in place; you gain access to somewhere you want to get into.",
    "fixed": false
   },
   {
    "name": "Just One More Thing",
    "text": "When you ask a suspect leading questions, roll +Charm. On 10+ hold 2, on 7–9 hold 1, on a miss hold 1 but something bad is going to happen too. Spend hold to ask: one question from the Search for Clues list; Was that a lie? What is something you left out that you did not want me to notice? Are you complicit in any ongoing wrongdoing? Did you commit this specific crime?",
    "fixed": false
   }
  ],
  "pick": 1,
  "gear": "A ledger, a liquor flask, two recording devices, and one investigator's weapon. Recording devices (pick two): a night-sight spyglass; a wax-cylinder recorder; a tiny scrying lens; a clockwork raven; a sketching kit; a listening horn; a sound recorder; a portrait lens. Investigator's weapons (pick one): brass knuckles (1-harm hand small); a hand crossbow (2-harm close reload loud); a short bow (2-harm close loud); a heavy crossbow (3-harm close reload loud); a great crossbow (3-harm close messy loud); a switchblade (1-harm hand small).",
  "history": "You are on the same (or rival) bowls team — ask what bowls-related disagreement rubbed them the wrong way. / You caught them committing a crime but let them go — ask them to describe the crime, then explain why your Code required you to look the other way. / They remind you of a former partner who was mysteriously murdered — describe the unsolved case that killed your partner, and how you hope to solve it. / You first approached them for help on a case — describe the case, and ask them what expertise solved it. / You were friends back in training, before you became an investigator — military, watch, or whatever; decide the details. / Ask if they live by a code, and what it is. If you approve, you have always respected them; if not (or if they have none), you have never trusted them. / They hired you for a job, but you were too drunk or high to take it — ask what they wanted, then tell them how you brushed them off. / You first met on a board for unsolved crimes — decide together what infamous crime fascinates you both.",
  "improvements": "+1 Charm (max +3) · +1 Cool (max +2) · +1 Sharp (max +3) · +1 Tough (max +2) · Another Inquisitor move · Add another harm box to your track, before Dying · A haven (your office, perhaps), like the Lorekeeper's, with two options · Add four additional or new contacts for your Naked City move"
 },
 {
  "id": "witch",
  "name": "The Witch",
  "orig": "Hex",
  "group": "new",
  "quote": "I did not have magic fall into my lap. I am not blessed, I am not one of the strange children — I am just someone who found a way to give herself the strength to fight this war. I do not have the option of not taking this risk.",
  "look": "Sharp, angry, glowing, shifty, serene, or featureless eyes · Old-fashioned, free-spirited, fashionable, too-formal, ill-fitting, or out-of-time clothes",
  "ratings": [
   "Charm+2 Cool 0 Sharp 0 Tough-1 Weird+2",
   "Charm+1 Cool-1 Sharp+1 Tough 0 Weird+2",
   "Charm-1 Cool+1 Sharp 0 Tough+1 Weird+2",
   "Charm-1 Cool 0 Sharp+1 Tough+1 Weird+2",
   "Charm 0 Cool 0 Sharp+2 Tough-1 Weird+2"
  ],
  "luck": "When you spend a point of Luck, until the end of the voyage, backlash on your spells will be extra nasty.",
  "features": [
   {
    "title": "Temptation — pick one",
    "text": "A dangerous drive you pursue, sometimes at the cost of your own safety. Decide if your Temptation drove you to learn magic, or if learning magic drove you to it. Whenever you give in to your Temptation and act on it, mark experience. You need to keep your nerve to resist giving in when a perfect opportunity presents itself; if you fail that roll, you do not mark experience as you would have by giving in willingly. Temptations: Vengeance — use magic to take disproportionate revenge on someone who wronged you. Power — use magic to exert dominance over another. Addiction — use magic to do what you could do without it. Callousness — use magic without regard for the safety of others. Carnage — use magic to inflict gruesome violence. Secrets — use magic to discover forbidden, dangerous knowledge. Glory — use magic to steal someone's thunder."
   },
   {
    "title": "Rotes — your known spells",
    "text": "Whenever you work sorcery, you may afterwards decide that spell is a rote you know. Write down in detail what it does and what it requires, and choose two requirements: magic words and ritual gestures; an object of power (wand, talisman, orb, staff) which must be wielded; an expendable component (sulphur, sage, or incense) burned, blown, or scattered; runes or symbols written or engraved on a surface; a spilling of blood, inflicting 1-harm on you or a willing participant. Unlike ordinary sorcery, a rote's cost and the consequences of failing it are known to you in advance. After casting it the first time, treat each rote as a custom move — a specialised Work Sorcery, built with the Chronicler: write down what it does on 10+, 7–9, and a miss. A rote is a little stronger than a basic spell: its glitches are lighter and its effect may be a little bigger. You start knowing up to one rote; learn more through improvements. Roll +Weird to cast a rote, as with ordinary sorcery."
   }
  ],
  "moves": [
   {
    "name": "Bad Luck Charm",
    "text": "Whenever you work sorcery and miss, the backlash never strikes you directly if someone else is near — it will go for allies, other hunters, and innocent port folk. Sometimes, every so often, it might even hit an enemy.",
    "fixed": true
   },
   {
    "name": "Burn Everything",
    "text": "When you work sorcery to inflict harm, you may choose to inflict 3-harm area magic obvious, or 3-harm ignore-armour magic obvious.",
    "fixed": false
   },
   {
    "name": "Cast the Bones",
    "text": "Once per voyage, you may perform a divination (cards, runes, entrails, or something like that) to learn about the future. When you seek guidance by divination, roll +Sharp. On 10+ hold 2; on 7–9 hold 1; on a miss you get information, but not what you want to hear. Spend hold to ask any Search for Clues question, or: What can I gain from this person, place, thing, or creature? Who has touched this person, place, thing, or creature before me? The Chronicler will answer truthfully, directly or by showing how to find out more.",
    "fixed": false
   },
   {
    "name": "Force of Will",
    "text": "When you apply your will to dispelling a magical effect, blocking a spell, or suspending a strange phenomenon, roll +Weird. On a hit, momentary magics are cancelled completely, and long-lasting spells and effects are suspended for a time. On 10+ you may also spend Luck to instantly snuff out a powerful spell or strange effect. On 7–9 you take 1-harm as the strain of dismissing magic unravels you.",
    "fixed": false
   },
   {
    "name": "Luck of the Damned",
    "text": "After you work sorcery or cast a rote, take +1 forward on the next roll you make.",
    "fixed": false
   },
   {
    "name": "Sympathetic Token",
    "text": "As long as you carry a personal object belonging to someone — a lock of hair, a treasured family heirloom — you gain +1 ongoing to work sorcery against them, and can work sorcery against them at a distance. If you try and miss, the token is lost, destroyed, or loses its power.",
    "fixed": false
   },
   {
    "name": "This Might Sting",
    "text": "You can work sorcery to heal 3-harm, but the process is exceptionally painful. On a 7–9 it also leaves a gnarly scar.",
    "fixed": false
   },
   {
    "name": "Wise Soul",
    "text": "Whenever you work sorcery, right before you roll, you may ask the Chronicler what exactly would happen on a miss. If you dislike the risk, you may stop at the last second and let the spell fizzle harmlessly. All the effort is wasted.",
    "fixed": false
   },
   {
    "name": "Illuminated \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Ask the Hidden Patrons for aid, roll +Weird. On 10+, they reveal a key fact, clue or technique that will help you. On 7-9, they need you to complete a task for them first \u2014 once it is done, they reveal it. On a miss, their reply is terrible, garbled, or dangerously wrong. On 12+, you may ask one follow-up question the Chronicler will answer honestly.",
    "fixed": false
   },
   {
    "name": "Past Lives \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Channel your previous incarnations: pose your question and roll +Weird. On 10+, a past life has something useful \u2014 ask the Chronicler two questions from the list. On 7-9, ask one. On a miss, a past life takes over for a while. On 12+, a past life knows exactly what you were after \u2014 ask one listed question and one free-form question, and take +1 ongoing while acting on the answers. Questions: What did a past life discover about ___? How did a past life deal with ___? What important hidden secret can a past life show me the way to? What did a past life learn too late to help them? What does a past life advise me to do now?",
    "fixed": false
   },
   {
    "name": "Sensitive \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Open your mind to the unseen, roll +Weird. On 10+, you gain a definite impression (a vision, a tangible aura, an overheard thought) about something important. On 7-9, a hazy impression. On a miss, your mind makes contact with something dangerous. On 12+, as for 10+, plus one follow-up question the Chronicler will answer honestly.",
    "fixed": false
   },
   {
    "name": "Empath \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Open your mind to feel the emotions of something right in front of you, roll +Weird. On 10+, a clear impression of their emotional state and intentions; take +1 forward when acting on it. On 7-9, a hazy impression. On a miss, your mind is overwhelmed with emotion. On 12+, as for 10+, plus one follow-up question the Chronicler will answer honestly. You can use it on anything with emotions \u2014 the less human they are, the less safe it is. If the emotions are especially strong or alien, you may need to keep your nerve first.",
    "fixed": false
   },
   {
    "name": "No Limits \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Push your body past its limits, roll +Weird. On 10+, your body obeys your will, to the limits of physical possibility, for a moment. On 7-9, you do it but choose one: suffer 1-harm, take -1 forward, or rest right now. On a miss, something goes horribly wrong. On 12+, you can keep acting at your body's limits for 30 seconds. 'Physical possibility' means conceivably possible for a human \u2014 lift a cart, leap a wagon, punch through a door \u2014 not lift a ship or fly.",
    "fixed": false
   },
   {
    "name": "Telekinesis \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Fling something with your mind, roll +Weird. On 10+, you move it: choose two options and mark 1-harm. On 7-9, you move it but it hurts: choose one option and mark 2-harm. On a miss, something goes horribly wrong. Options: something is held fast; something is hurt (2-harm smash); something catches fire; you fling something bigger than a person; you keep it basically under your control; you suffer 1 less harm. On 12+, choose three options, and you may also choose: something explodes (3-harm close fire area messy); something implodes (3-harm close crush); lots of stuff flies under your control; you have perfect, precise control. By default you can move something smaller than a person, with little control, and not hard enough to hurt anything.",
    "fixed": false
   },
   {
    "name": "Trust Your Gut \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Consult your instincts about what to do next, roll +Weird. On 10+, the Chronicler will tell you where you should go \u2014 wherever that is, it will be important; take +1 ongoing on the way. On 7-9, a general direction; take +1 forward as you explore. On a miss, your instincts lead you into danger. On 12+, the Chronicler also tells you about one important thing you should investigate further.",
    "fixed": false
   },
   {
    "name": "Strange Craft \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery (the weird-science move, reskinned). Create or adapt a device to analyse or deal with strangeness: say what it will do and roll +Weird. On 10+, pick two requirements; on 7-9, pick one and the Chronicler picks a second; on a miss, something goes horribly wrong \u2014 you can still create it, but the Chronicler picks three requirements. On 12+, take +1 ongoing when operating the device. Requirements: it needs a rare and/or weird material; it won't be very reliable; it requires huge amounts of power or fuel; it will take a long time to get working; it won't work exactly as intended; you'll need help beyond your company to finish it.",
    "fixed": false
   }
  ],
  "pick": 2,
  "gear": "Whatever magical items or amulets you use to perform magic, including what you need to cast your rotes. Two witch's weapons (pick two): a hand crossbow (2-harm close reload loud); a heavy crossbow (3-harm close messy loud); an athame (2-harm hand magic silver); a shillelagh (1-harm hand balanced); a hunting crossbow (2-harm close slow); a staff (1-harm hand balanced large).",
  "history": "You once cast a powerful spell or curse on them — tell them why, and ask how it ended. / They fear your power, or what you might do with it — ask why. / You are madly in love with them — ask if they can tell. / They encourage you to indulge your temptation — ask why. / They keep you grounded, and are unfazed by your displays of power. / You were part of the same cult, order, or secret society — decide together what terrible things you did in the name of power. / You learned through divination that they are important and you should help them — decide whether you have told them or not. / They helped you out when a spell went awry — tell them what the spell was, and ask how they helped you.",
  "improvements": "+1 Weird (max +3) · +1 Cool (max +2) · +1 Charm (max +2) · +1 Sharp (max +2) · Take another rote · Take another Hex move, or an additional rote · Take a haven, like the Lorekeeper's, with two options · Take a move from another playbook. Advanced (after five level-ups): gain another two rotes; or choose an advanced Witch move — Apotheosis (once per voyage, after suffering loss or harm, become a terrifying fount of power: you can fly, use +Weird to fight instead of +Tough with innate magic as a 3-harm weapon, ignore rote component costs and one requirement of every spell, and have +1 ongoing to everything — but you cannot guard anyone, you hold all Temptations and must indulge them when you can; to end it, roll +Cool: on 10+ it ends, on 7–9 it ends with you doing something dangerous or cruel, on a miss it ends only after you harm someone you love) or Synthesis (you lose your Temptation; whenever you work sorcery to lend aid or guard someone, mark experience — mark a second if it costs you your own safety). You can never have both.",
  "trackers": [
   {
    "key": "rotes",
    "label": "Rotes known",
    "boxes": 6,
    "note": "Name each rote and its two requirements in your notes."
   }
  ]
 },
 {
  "id": "vessel",
  "name": "The Vessel",
  "orig": "Host",
  "group": "new",
  "quote": "Listen, we have only got this one body between us, so we are going to have to cooperate.",
  "look": "Starved, unwell, too-perfect body, odd growths, an uncanny-valley body · Distracted, quiet, frequent pauses, two voices, fidgety · A long coat and wide-brimmed hat, a uniform, a hooded cloak, tattered clothes, practical clothes, a containment suit",
  "ratings": [
   "Charm+1 Cool 0 Sharp-1 Tough+1 Weird+2",
   "Charm-1 Cool+1 Sharp+2 Tough 0 Weird+1",
   "Charm-1 Cool+2 Sharp+1 Tough+1 Weird 0",
   "Charm-1 Cool-1 Sharp 0 Tough+2 Weird+2",
   "Charm+1 Cool+1 Sharp 0 Tough-1 Weird+2"
  ],
  "luck": "When you spend a point of Luck, something upsets the balance between you and your symbiote — a strange ailment, or new demands.",
  "features": [
   {
    "title": "Symbiosis — benefits (pick two) and a downside (pick one)",
    "text": "Benefits: aligned motivations; unaging; can survive pressure and lack of air; immune to poison and disease; disease, drug, and poison resistance; subtle physical improvements; cannot be possessed; can climb walls; efficient metabolism; a non-physical symbiote. Downsides: limited communication; a body timeshare; biological needs; personality conflicts; obvious mutations; distracting chatter; a magical aura."
   }
  ],
  "moves": [
   {
    "name": "Defensive Adaptation",
    "text": "Your symbiote protects you. Pick one: silk threads (0-harm close entangle sticky); acid spray (1-harm close blinding acid); soothing thoughts (0-harm intimate/hand sedative calming); scales (1-armour); camouflage (+1 ongoing to stay out of sight); whispered advice (+1 hold to Read the Room, even on a miss).",
    "fixed": true
   },
   {
    "name": "Mutual Survival",
    "text": "Your symbiote helps you heal. Take 1 less harm from attacks and hazards when unstable. Whenever you heal, heal one extra harm.",
    "fixed": false
   },
   {
    "name": "Balanced Nature",
    "text": "Take +1 ongoing resisting emotional manipulation or mental assault. Your blood or other bodily substances sometimes count as a special requirement for great sorcery or strange craft (unlike a normal human's).",
    "fixed": false
   },
   {
    "name": "Open Your Mind",
    "text": "When you search for clues, you may also ask: What about the creature is not immediately obvious? What forms can it take? What does it need?",
    "fixed": false
   },
   {
    "name": "Predator and Prey",
    "text": "Your symbiote is a skilled hunter. When you take a stealthy approach, roll +Cool. Spend hold to keep yourself or someone else hidden when they would otherwise be found. On 10+ hold 3; on 7–9 hold 2; on a miss you find yourself in an awkward or dangerous position.",
    "fixed": false
   },
   {
    "name": "Collaborative Effort",
    "text": "You understand working with others better. When you lend aid, grant +1 forward to another hunter. This may be the same hunter you are aiding — if so, they gain +1 forward on their next two rolls.",
    "fixed": false
   },
   {
    "name": "Separation Anxiety",
    "text": "Your symbiote can leave your body for short periods to carry out tasks. During this time it counts as an ally, and moves tied to the union may be unavailable or suffer −1 ongoing. Roll +Cool. On 10+ mark unstable in 30 minutes; on 7–9 mark unstable in 10 minutes; on a miss mark unstable right now. Remove unstable if you rejoin.",
    "fixed": false
   }
  ],
  "pick": 2,
  "gear": "A personal item (pick one): a journal recording the symptoms of your bonding; a journal of notes left between you and your symbiote; a ledger; a book of songs; tattered novels; a portrait of better times; art supplies and a sketchbook; a sound recorder and backup storage. A weapon (pick one): a strange martial art (1-harm hand); a symbiotic blade (2-harm hand integrated retractable); a symbiotic stunner (0-harm close stun integrated retractable); a hand crossbow (2-harm close reload loud); a heavy crossbow (3-harm close reload loud); a sword (2-harm hand); a ray-rod (2-harm close messy energy); a blunderbuss (3-harm close messy loud).",
  "history": "They were instrumental in you meeting and bonding with your symbiote — decide together how it happened. / Your meeting with them was not coincidence — why did you seek them out? Ask if they are suspicious of you. / You are related, and another close relative has recently gone missing — ask if their memories of this person are good or bad, then tell them if yours are the same. / They have always treated you with respect — ask whether it is because of how you bonded with the symbiote, or how you handle it. / You will protect them before anybody else — do you know why you act this way? Ask how they feel about it. / They seem to always be watching you — ask what concerns them, and how you respond. / You have been friends since you met over a shared, relaxing interest — decide what it is, and whether it was before your symbiosis. / They used to bear the same symbiote you do — ask how they became separated, and how they feel about it. Have you discussed how they feel about their former symbiote being yours now?",
  "improvements": "+1 Cool (max +3) · +1 Weird (max +2) · +1 Tough (max +2) · +1 Charm (max +2) · Another Vessel move · A move from another playbook · A haven like the Lorekeeper's, with two options · An ally — another with a symbiote like yours, or someone who helps you manage the condition · Another benefit from Symbiosis · Another option from Defensive Adaptation"
 },
 {
  "id": "channeler",
  "name": "The Channeler",
  "orig": "Interface",
  "group": "new",
  "quote": "I know where I stand with clockwork and runes. People are just nonsense.",
  "look": "Slender, buff, tall, long-limbed, stocky, heavyset, famished build · Wild hair, strange implants, a smell of ozone, dishevelled, unnaturally clean · Comfortable clothes, dirty clothes, practical clothes, old-fashioned clothes",
  "ratings": [
   "Charm-1 Cool+2 Sharp+1 Tough 0 Weird+1",
   "Charm-1 Cool+1 Sharp+2 Tough+1 Weird 0",
   "Charm-1 Cool 0 Sharp+2 Tough-1 Weird+2",
   "Charm-1 Cool+1 Sharp+1 Tough+2 Weird 0",
   "Charm 0 Cool+1 Sharp+2 Tough+1 Weird-1"
  ],
  "luck": "When you spend a point of Luck, you gain a chance at either a significant social connection or an incredible piece of craft.",
  "features": [
   {
    "title": "Integration — upgrades (pick two) and faults (pick two)",
    "text": "Upgrades: always connected; specialised tools; a security specialist; an intelligence archive; aim-assist; a heads-up display; everything is compatible; speed writing. Faults: need my gear; a hackable mind; specialised maintenance; undisciplined; an overhyped reputation; overconfidence; buggy implants. How you gained these abilities (pick one): We Can Rebuild Them — you were rebuilt after a near-death, or actual death. Who thought you important enough to keep alive? · Technopath — you have a magical relationship with mechanisms. How did you gain or discover your powers? · Volunteer — you volunteered to be upgraded. Who had the craft to do this to you? · Skillz — sheer genius and hard work. What event made your reputation, and how does it cause you trouble? · Artificial — you were created this way. What was your original purpose? Have you transcended it?"
   }
  ],
  "moves": [
   {
    "name": "Technomancer",
    "text": "When you repurpose a mechanism on the fly to do something it was not designed for, roll +Cool. On 10+ it does what you want — pick three effects. On 7–9 it does it and shuts down — pick one effect. Effects: the mechanism is repairable afterwards; there is no collateral damage; it works longer than expected; you can shut it down safely; it is stronger than you expected; you have full control.",
    "fixed": false
   },
   {
    "name": "Provocateur",
    "text": "You can read a room on any dangerous, thinking being. When you do, you may also ask: What will infuriate them? What do they want most? On a miss, they act while you are making plans.",
    "fixed": false
   },
   {
    "name": "Keep Going and Going",
    "text": "You do not need sleep, and are immune to sedating effects from any source.",
    "fixed": false
   },
   {
    "name": "Take the Shot",
    "text": "You may forgo +1 ongoing from Read the Room to gain +2 forward on a single relevant roll.",
    "fixed": false
   },
   {
    "name": "Secret Passages",
    "text": "You immediately know whether a mechanism you are attuned to has hidden passages or connections. When you successfully work a mechanism, give another hunter +1 forward.",
    "fixed": false
   },
   {
    "name": "Curse Whisperer",
    "text": "When you quarantine or create a spreading curse, roll +Cool. On 10+ pick two; on 7–9 pick one: you safely contain the curse; it erases or changes specific information; it locks down the mechanism; ask one question from the Search for Clues list.",
    "fixed": false
   },
   {
    "name": "Illuminated \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Ask the Hidden Patrons for aid, roll +Weird. On 10+, they reveal a key fact, clue or technique that will help you. On 7-9, they need you to complete a task for them first \u2014 once it is done, they reveal it. On a miss, their reply is terrible, garbled, or dangerously wrong. On 12+, you may ask one follow-up question the Chronicler will answer honestly.",
    "fixed": false
   },
   {
    "name": "Past Lives \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Channel your previous incarnations: pose your question and roll +Weird. On 10+, a past life has something useful \u2014 ask the Chronicler two questions from the list. On 7-9, ask one. On a miss, a past life takes over for a while. On 12+, a past life knows exactly what you were after \u2014 ask one listed question and one free-form question, and take +1 ongoing while acting on the answers. Questions: What did a past life discover about ___? How did a past life deal with ___? What important hidden secret can a past life show me the way to? What did a past life learn too late to help them? What does a past life advise me to do now?",
    "fixed": false
   },
   {
    "name": "Sensitive \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Open your mind to the unseen, roll +Weird. On 10+, you gain a definite impression (a vision, a tangible aura, an overheard thought) about something important. On 7-9, a hazy impression. On a miss, your mind makes contact with something dangerous. On 12+, as for 10+, plus one follow-up question the Chronicler will answer honestly.",
    "fixed": false
   },
   {
    "name": "Empath \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Open your mind to feel the emotions of something right in front of you, roll +Weird. On 10+, a clear impression of their emotional state and intentions; take +1 forward when acting on it. On 7-9, a hazy impression. On a miss, your mind is overwhelmed with emotion. On 12+, as for 10+, plus one follow-up question the Chronicler will answer honestly. You can use it on anything with emotions \u2014 the less human they are, the less safe it is. If the emotions are especially strong or alien, you may need to keep your nerve first.",
    "fixed": false
   },
   {
    "name": "No Limits \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Push your body past its limits, roll +Weird. On 10+, your body obeys your will, to the limits of physical possibility, for a moment. On 7-9, you do it but choose one: suffer 1-harm, take -1 forward, or rest right now. On a miss, something goes horribly wrong. On 12+, you can keep acting at your body's limits for 30 seconds. 'Physical possibility' means conceivably possible for a human \u2014 lift a cart, leap a wagon, punch through a door \u2014 not lift a ship or fly.",
    "fixed": false
   },
   {
    "name": "Telekinesis \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Fling something with your mind, roll +Weird. On 10+, you move it: choose two options and mark 1-harm. On 7-9, you move it but it hurts: choose one option and mark 2-harm. On a miss, something goes horribly wrong. Options: something is held fast; something is hurt (2-harm smash); something catches fire; you fling something bigger than a person; you keep it basically under your control; you suffer 1 less harm. On 12+, choose three options, and you may also choose: something explodes (3-harm close fire area messy); something implodes (3-harm close crush); lots of stuff flies under your control; you have perfect, precise control. By default you can move something smaller than a person, with little control, and not hard enough to hurt anything.",
    "fixed": false
   },
   {
    "name": "Trust Your Gut \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery. Consult your instincts about what to do next, roll +Weird. On 10+, the Chronicler will tell you where you should go \u2014 wherever that is, it will be important; take +1 ongoing on the way. On 7-9, a general direction; take +1 forward as you explore. On a miss, your instincts lead you into danger. On 12+, the Chronicler also tells you about one important thing you should investigate further.",
    "fixed": false
   },
   {
    "name": "Strange Craft \u2014 Alternative Weird",
    "text": "Alternative Weird: take this instead of Work Sorcery (the weird-science move, reskinned). Create or adapt a device to analyse or deal with strangeness: say what it will do and roll +Weird. On 10+, pick two requirements; on 7-9, pick one and the Chronicler picks a second; on a miss, something goes horribly wrong \u2014 you can still create it, but the Chronicler picks three requirements. On 12+, take +1 ongoing when operating the device. Requirements: it needs a rare and/or weird material; it won't be very reliable; it requires huge amounts of power or fuel; it will take a long time to get working; it won't work exactly as intended; you'll need help beyond your company to finish it.",
    "fixed": false
   }
  ],
  "pick": 3,
  "gear": "You have the tools needed to work on your craft, and an internal mechanism, integrated. You may take tactical armour worth 1-armour if you wish. Mechanisms (pick three): a remote-controlled spy-raven; a miniature calculating engine; a recording suite, integrated; an enhanced sensor array, integrated; a jumping device, boots, or glider, integrated; a forgettable cart; a plain wagon. Weapons (pick two): take a weapon from the Quartermaster's gear and give it +integrated and +blatant; muscle augments (1-harm hand useful integrated); an energy rod (2-harm close energy); clockwork drones (1-harm close autonomous area); a zapper (0-harm close stun); a short bow (2-harm close loud); a fashionable blade (2-harm hand); a tool (1-harm close useful). Comforts (pick two): a nostalgic portrait; an endlessly replayed message; a project journal; a game board; all the strong coffee.",
  "history": "They knew you before your abilities really took off — ask what they think of the change. / You have learned a secret about them — decide together what it is, and if they know you know. / They are a relative — cousins or closer. Ask what part they played in you becoming what you are. / They always give you the space you need — what method do they use when they really need to get through to you? / Why can you never say the right thing to them, no matter how much you want to? Ask if they have noticed your struggle. / You suspect they know more about you than they are saying — ask what they suspect. / You share a surprising hobby — what is it? / How did you ruin an important day in their life?",
  "improvements": "+1 Sharp (max +3) · +1 Tough (max +2) · +1 Cool (max +2) · +1 Weird (max +2) · Another Channeler move · A move from another playbook · Add, remove, or change three tags on gear (may be spread across several pieces) · A haven like the Lorekeeper's, with a workshop, a calculating engine, and two other options · Add an Upgrade or change a Fault · Add the 'integrated' and 'blatant' tags to a piece of wearable or handheld gear · Add the 'retractable' tag to a piece of wearable or handheld gear"
 },
 {
  "id": "starcrossed",
  "name": "The Star-Crossed",
  "orig": "Pararomantic",
  "group": "new",
  "quote": "There is a reason my love is forbidden. The Chronicler knows it. I am still learning it.",
  "look": "Friendly, alluring, laughing, trustworthy, average, serious, or sensual face · Normal, casual, dark, sporty, street, or scholar's clothes",
  "ratings": [
   "Charm+2 Cool+1 Sharp 0 Tough-1 Weird+1",
   "Charm+2 Cool-1 Sharp+1 Tough+1 Weird 0",
   "Charm+2 Cool+2 Sharp 0 Tough 0 Weird-1",
   "Charm+2 Cool+1 Sharp+1 Tough-1 Weird 0",
   "Charm+2 Cool 0 Sharp+2 Tough-1 Weird 0"
  ],
  "luck": "When you spend a point of Luck, also mark off one box of your Relationship track. The Chronicler will bring the fate of your love into play.",
  "features": [
   {
    "title": "Your Guide & the Fate of Your Love",
    "text": "You have a most likely intimate connection to a hidden being who is your guide into the world beyond. Decide if your relationship is secret or not, what kind of creature your Guide is, how the relationship works, and what power they hold. The Chronicler decides how it works and defines your Guide as a threat. If your Guide is another hunter, decide together how the relationship works. Relationship track: Loving (7 boxes) to Broken. There is a reason your love is forbidden or doomed — invent it, or leave it to the Chronicler. Whenever you spend Luck, the truth of your love's fate unfolds: mark a box on your Relationship track. When your last Luck is spent, it becomes clear you cannot be together — your Guide might even become an enemy. Whenever you put yourself or someone else in serious danger to hide the truth about you and your Guide, mark experience. Bond Abuse: whenever you abuse the bond — acting against your Guide, or not giving them enough attention — roll +Charm. On 10+ your action has no effect beyond angry words. On 7–9 choose one bond-abuse option; on a miss the Chronicler chooses two, or something worse. Options: mark a box on your Relationship track; you may not channel your bond for the rest of the voyage; you gain the unwelcome attention of others of your Guide's kind; someone who should not know finds a clue about your relationship."
   }
  ],
  "moves": [
   {
    "name": "Supernatural Guide",
    "text": "Whenever you would roll +Weird, you may roll +Charm instead, by channelling the power of your bond. When you do so and miss, in addition to the usual consequences, you and your Guide suffer as when you miss a roll for bond abuse.",
    "fixed": true
   },
   {
    "name": "Bonding Time",
    "text": "If you spend quality time with your Guide instead of working on the current voyage, roll +Charm. On 10+ hold 2; on 7–9 hold 1. Spend hold to: erase one mark on your Relationship track; use a Star-Crossed move you have not picked; receive a gift from your Guide; take +1 forward.",
    "fixed": false
   },
   {
    "name": "Dark Desires",
    "text": "You may use Persuade Someone on cursed creatures, as long as you are using emotional ties.",
    "fixed": false
   },
   {
    "name": "The Power of Love",
    "text": "When you lend aid to your Guide, you do not need to roll +Cool — you help as though you had rolled a 10. If your Guide is another hunter, the same applies when they help you.",
    "fixed": false
   },
   {
    "name": "Do As the Hidden Do",
    "text": "You can take an unnatural move from your Guide's playbook (if they are a hunter). If they are a cursed creature, choose a move from a suitable hidden playbook. The Chronicler may offer you a custom move instead.",
    "fixed": false
   },
   {
    "name": "I Am Theirs and They Are Mine",
    "text": "Whenever you are in danger, your Guide knows it. If your Guide is suffering harm (and it is feasible), you can spend a point of Luck to redirect the attack onto yourself, as if you had rolled 10+ to guard them. If you are suffering harm, you can decide your Guide has protected you and suffers this harm instead — if you choose this, roll for bond abuse.",
    "fixed": false
   },
   {
    "name": "Cursed Empathy",
    "text": "When you try to work out what a hidden creature desires, roll +Charm. On 10+ hold 2; on 7–9 hold 1. Spend hold to ask — the Chronicler will answer honestly: What does it most desire? What would it accept as good enough for now? What would distract it?",
    "fixed": false
   },
   {
    "name": "Spirit Touched",
    "text": "Your experiences have made you sensitive to the hidden world. When you sense magical things, roll +Weird. On 10+ you sense them fully. On 7–9 choose: sense them fully, but they notice you too — or sense only impressions.",
    "fixed": false
   }
  ],
  "pick": 2,
  "gear": "Choose two ordinary things: a sporting club (2-harm hand innocuous messy); a pocket knife or multitool (1-harm hand useful small); a hand crossbow (2-harm close loud reload); a horse; a fine coach in decent condition; a warhorse. And choose one gift from your Guide — it must be periodically recharged by time with your Guide. Gifts: part of their body (a vial of blood, a lock of hair, tears in a phial, faerie dust) — it either helps you heal, or counts as a weakness against a specific sort of cursed thing. A piece of jewellery (a golden ring, a tribal pendant, a silver locket) — it either gives 1-armour magic, or protects you from the powers of a specific sort of cursed thing. A memento of when they were human (a portrait, a diary, a favourite hat, a doll, a lighter) — +1 on bond abuse rolls. A strange or antique weapon (a family sword, an ancient staff, a holy mace, 2-harm hand messy) — add 'magic', 'silver', 'holy', or 'iron' to the weapon.",
  "history": "Your best friend in the world — you trust them totally. / You are blood-kin — decide your exact relationship together. / Your ex — ask why you are not together any more. / A romantic entanglement, or one fated to be. / They know some of your dark secrets, but have agreed to keep quiet — tell them what they know. / An old rivalry has turned into a tight friendship — ask what (or who) you once fought over. / A mentor from another life — ask what they taught you.",
  "improvements": "+1 Charm (max +3) · +1 Cool (max +2) · +1 Sharp (max +2) · +1 Weird (max +2) · Another Star-Crossed move · Gain an ally · A move from another playbook · Take a second gift from your Guide, or add another property to an existing gift · Change your Guide, as you fall for another creature · Gain a second Guide — track both Relationship tracks separately; both Guides initially hate each other, but that could change · Erase all marks from your Relationship track",
  "trackers": [
   {
    "key": "relationship",
    "label": "Relationship — Loving to Broken",
    "boxes": 7,
    "note": "Mark one when you spend Luck; when the last Luck is spent, you cannot be together."
   }
  ]
 },
 {
  "id": "seeker",
  "name": "The Seeker",
  "orig": "Searcher",
  "group": "new",
  "quote": "There is still so much to be discovered and explained, even now. Perhaps only one event in a thousand is true strangeness — but I will investigate them all to find it.",
  "look": "Friendly, haunted, thoughtful, lined, or curious face · Normal, casual, scholar's, tweedy, or outdoor clothes",
  "ratings": [
   "Charm 0 Cool+1 Sharp+1 Tough-1 Weird+2",
   "Charm+1 Cool-1 Sharp+1 Tough 0 Weird+2",
   "Charm 0 Cool-1 Sharp+2 Tough 0 Weird+2",
   "Charm 0 Cool+1 Sharp+2 Tough-1 Weird+1",
   "Charm+1 Cool 0 Sharp+2 Tough-1 Weird+1"
  ],
  "luck": "When you spend a point of Luck, your first encounter comes up in play — a flashback, a new occurrence, or a related event.",
  "features": [
   {
    "title": "First Encounter — pick one, and take its move",
    "text": "Cryptid Sighting: you take note of any reports of strange creatures. Whenever you first see a new type of creature, you may immediately ask one Search for Clues question. · Zone of Strangeness: things are not fixed. You never need to keep your nerve when hidden forces alter the world around you, and you count as having 2-armour against harm from sudden changes to the laws of the world. · Psychic Event: your mind is awakened. You may keep your nerve to use the sensitive strange move — or, if sensitive is your strange move, take empath (see the Tome of Mysteries). · Higher Power: something looks out for you. You start with an extra Luck. · Strange Dangers: you are always watching for hazards. When you have no armour, you still count as having 1-armour. · Abduction: they taught you hidden knowledge. Gain +1 to any move when you research strange or ancient secrets to do it. · Cosmic Insight: you have encompassed the soul of the universe. You never need to keep your nerve because of fear, despair, or isolation."
   }
  ],
  "moves": [
   {
    "name": "First Encounter",
    "text": "One strange event started you down this path, sparking your need to discover the truth behind the unexplained. Pick a category above and take its move. Then tell everyone what happened to you — or to someone close to you.",
    "fixed": true
   },
   {
    "name": "Prepared to Defend",
    "text": "Even truth-seekers need to fight sometimes. Whenever you suffer harm while fighting or guarding someone, you suffer 1-harm less.",
    "fixed": false
   },
   {
    "name": "Fellow Believer",
    "text": "People understand you have also known strangeness. Port folk will talk to you about strange things they would not trust another hunter (or a harbour official) to believe.",
    "fixed": false
   },
   {
    "name": "Guardian",
    "text": "You have a hidden ally (perhaps a spirit, a far-traveller, or a sea-beast) who helps and defends you. Define them, and their powers, with the Chronicler's agreement. Their look is one of: invisible; an intangible spirit thing; a strange creature; disguised as an animal; or disguised as a person.",
    "fixed": false
   },
   {
    "name": "Just Another Day",
    "text": "When you must keep your nerve because of a cursed creature, a phenomenon, or a mystical effect, you may roll +Weird instead of +Cool.",
    "fixed": false
   },
   {
    "name": "Network",
    "text": "You may gain an ally group of others who had experiences like your first encounter — perhaps a support group or a society of the curious. Detail up to five members with useful skills tied to what happened to them (none are up for fighting cursed things).",
    "fixed": false
   },
   {
    "name": "Ockham's Broadsword",
    "text": "When you first encounter something strange, you may ask the Chronicler what sort of thing it is. They will tell you if it (or its cause) is: natural, an unnatural creature, a strange phenomenon, or a person. You gain +1 forward dealing with it.",
    "fixed": false
   },
   {
    "name": "The Things I've Seen",
    "text": "When you encounter a creature or phenomenon, you may declare you have seen it before. The Chronicler may ask you some questions about that encounter, then will tell you one useful fact you learned and one danger you need to watch out for — maybe right now.",
    "fixed": false
   }
  ],
  "pick": 2,
  "gear": "A ledger, a horse or warhorse, a spyglass, a far-seeing lens, two sets of investigation tools, and one self-defence weapon. Investigation tools (pick two): a bag of lenses and listening horns; forensic tools; ghost-hunting tools; scientific measuring tools; sea-beast hunting gear; historical documents and witness reports of strange events; maps, blueprints, and building reports for significant places. Self-defence weapons (pick one): a walking stick (1-harm hand innocuous); a hand crossbow (2-harm close reload loud); a small knife (1-harm hand messy); martial arts training (1-harm hand innocuous); an incapacitating spray (0-harm hand irritating); a heavy lantern (1-harm hand innocuous).",
  "history": "In your researches, you found accounts (and portraits) of someone matching their description perfectly — but long before they were born. Tell them if you have mentioned this. / A relative — decide between you how close. / They were involved in a strange event like your first encounter — perhaps the same event, or one you investigated later. Ask how it affected them. / You worked out a hidden secret they keep — ask what it is. / You met when you were each investigating separate voyages — tell them what trick you used to protect them from strangeness, and ask how they saved you from a danger. / You are both veterans of a support group or treatment programme — work out the details. / Some creature or force is stalking them — ask what it is, then decide if you have told them, or if they are still happily unaware. / You found their pet when it went missing — where had it gone?",
  "improvements": "+1 Sharp (max +3) · +1 Weird (max +3) · +1 Charm (max +2) · +1 Cool (max +2) · Another Seeker move · Gain an ally · Take a second first-encounter move, based on a recent voyage · A move from another playbook · Resolve your first encounter — the Chronicler makes the next voyage about this event, and should try to answer all remaining questions about it during the voyage"
 },
 {
  "id": "broadsheet",
  "name": "The Broadsheet",
  "orig": "Snoop",
  "group": "new",
  "quote": "Sea-beasts have kept out of sight, but I am going to find them and record them. The evidence will be incontrovertible, and I will be the one who did it. I am going to be a star one day, you mark my words! Hey… did you just feel a chill?",
  "look": "Slender, hefty, trim, jittery, tall, or short body · Student clothes, arty clothes, an old suit, a stylish suit, safari wear, a hat and long coat, utility wear",
  "ratings": [
   "Charm+2 Cool-1 Sharp+1 Tough 0 Weird+1",
   "Charm+2 Cool 0 Sharp+1 Tough-1 Weird+1",
   "Charm+2 Cool+1 Sharp+1 Tough 0 Weird-1",
   "Charm+2 Cool-1 Sharp+2 Tough-1 Weird 0",
   "Charm+2 Cool+1 Sharp 0 Tough-1 Weird+1"
  ],
  "luck": "When you spend a point of Luck, you are going to have technical difficulties — breakdowns, communication problems, strange noises in the recordings, and so on.",
  "features": [
   {
    "title": "Your Crew",
    "text": "Decide if your crew is the other hunters, or if you have an entourage. If they are not the hunters, there are up to three of them — pick a name and a job for each (camera, sound, editing, dogsbody, researcher, driver, director, producer, bodyguard). Your crew are port folk, played by the Chronicler. If it is the other hunters, decide together who gets which job. Example: the team has a broadsheet channel, 'Sea-Beast Revelations', covering their hunts and teaching readers about the creatures really out there. A Broadsheet is required to run it; a Chart-Reader or Lorekeeper makes a good researcher; a Commoner can make the coffee; everyone else can hold a lens or a listening horn, or carry things."
   }
  ],
  "moves": [
   {
    "name": "What Does That Feel Like?",
    "text": "When you put your lens or listening horn right in a person's face, they break off whatever they are doing. They might go right back to it after they deal with you, but you will create enough time for the other hunters to act in the meantime.",
    "fixed": false
   },
   {
    "name": "Minor Celebrity",
    "text": "At the beginning of each voyage, roll +Weird. On 10+ hold 2; on 7–9 hold 1. Spend hold during the voyage to have someone you meet know of you in a good light — perhaps they read your broadsheet, listen to your ballads, or watch your travelling show. You may end up being asked for autographs, or given 'hot' leads.",
    "fixed": false
   },
   {
    "name": "We'll Fix It in Post",
    "text": "You can use anything you could conceivably have recorded as evidence for Search for Clues, letting you check previous interviews, attack sites, and so on from the comfort of your ledger.",
    "fixed": false
   },
   {
    "name": "Press Accreditation",
    "text": "When you search for clues by talking to witnesses, interviewing locals, or anything else needing people skills, roll +Charm instead of +Sharp.",
    "fixed": false
   },
   {
    "name": "Truthiness",
    "text": "Whatever you tell an ordinary person, they will accept that you think it is true. If it is far-fetched, they might think you are deluded — but they will not think you are lying.",
    "fixed": false
   },
   {
    "name": "The Mojo Wire",
    "text": "When you spend a while reading all the latest broadsheets and harbour gossip looking for the strange stuff, take +1 forward.",
    "fixed": false
   },
   {
    "name": "Relaxed Producer",
    "text": "You are employed, with a regular wage and little or no oversight. As long as you send in a story every few days, no matter how bizarre, you are set. Every now and again they will send you somewhere in particular, and when that happens it usually involves hidden activity. Unless they need human interest — in which case it will be a kitten show or an agricultural fair or something.",
    "fixed": false
   }
  ],
  "pick": 3,
  "gear": "A ledger, three recording devices, two detectors, and one subtle weapon. Recording devices (pick three): a video lens; a tiny portrait lens; a sketching kit; a sound recorder; a wax-cylinder recorder; an infrared lens; pro sound gear; a clockwork raven; a starlight lens; a steady-rig; a listening horn; a portrait lens; a fine sketchbook. Detectors (pick two): a lodestone detector; a temperature-fluctuation detector; a spirit board; a humidity meter; dowsing rods; a chemistry test kit; a metal detector; a compass; a charting device; a rangefinder; a pendulum; a tarot deck. Subtle weapons (pick one): a multitool or pocket knife (1-harm hand hidden useful); a shocking rod (1-harm hand stun); a cricket bat (2-harm hand innocuous messy); a hand crossbow (2-harm close loud); a knife (1-harm hand hidden).",
  "history": "Best friends from school or university (a playwriting class, maybe?). / You met this hunter when they slew a cursed thing you were doing a story on — ask what it was. / This hunter almost defeated a cursed thing, but you did something to prevent it — ask what it was, then tell them what you did. Was it an accident, or on purpose? / This hunter was in danger of unhelpful publicity, but you got the story killed. / You have a crush on this hunter — ask if they have noticed. / This hunter saved you when you did something foolish — ask what you did. / This hunter is a huge admirer of your work — ask if they keep quiet about it, or if everyone knows. / This hunter is a relation, close or distant — decide between you exactly what.",
  "improvements": "+1 Charm (max +3) · +1 Cool (max +2) · +1 Weird (max +2) · +1 Sharp (max +2) · Another Broadsheet move · An ally: one of your existing crew members, or the whole crew as an ally team · A haven, like the Lorekeeper's, with one option plus a print shop and editing room · A move from another playbook · Make it big — you are a star now!"
 },
 {
  "id": "showmaster",
  "name": "The Showmaster",
  "orig": "Spooktacular",
  "group": "new",
  "quote": "I have travelled all over, pretty much everywhere you can make a coin. I have made people happy, and I suppose annoyed a few. But everywhere you go has cursed things — this show included.",
  "look": "Human, slightly inhuman, fate-marked · Friendly, guarded, observant, open, weathered, or young face · Fancy clothes, old clothes, a stage costume, working clothes",
  "ratings": [
   "Charm+2 Cool-1 Sharp+1 Tough 0 Weird+1",
   "Charm+2 Cool+1 Sharp 0 Tough-1 Weird+1",
   "Charm+2 Cool 0 Sharp-1 Tough-1 Weird+2",
   "Charm+1 Cool 0 Sharp-1 Tough+1 Weird+2",
   "Charm+1 Cool+1 Sharp 0 Tough-1 Weird+2"
  ],
  "luck": "When you spend a point of Luck, you are going to run into someone you met at the Show. It could be good, it could be bad — who knows?",
  "features": [
   {
    "title": "The SHOW — pick your show's specialty",
    "text": "You spent a long time with a travelling show and gain an ability from its style. Are you still with them? If so, how do you balance work and hunting? If you left, why? Pick one: An Infernal Power — a great villain ran the Show for evil purposes. You signed the contract — take a three-box infernal favour track. Spend these as if they were Luck points. The villain may restore these points when they wish, but first you must do something unforgivably terrible. What sin have you already committed? · Magic & Illusions — you can cast confounding spells. When you weave an illusion, roll +Weird. On 10+ everyone is fooled: they are led in a direction of your choice, or you and those you choose escape undetected. On 7–9 it does not quite work: misdirect or escape as on a 10+, but the Chronicler chooses one — someone is not fooled, or you gain unwelcome attention. On a miss, it goes badly, as magic always does. · Making Money — you have much practice bamboozling folk. When you mess with someone, roll +Charm. On 10+ they do not know what is going on and overlook something of your choice. On 7–9 they still overlook something, but they are more angry than baffled. On a miss, you had better run. · Problem Solvers — the Show rolls into town, people visit and reveal their difficulties, and the crew arrange to make things better, leaving each town a little happier than they found it. When you chat with someone, or observe them for a few minutes, the Chronicler will tell you what their biggest problem is right now. · Hidden Creatures — you are not entirely human yourself. Pick a single hidden move from any hunter playbook (the Cursed is a good place to start). How does your inhuman nature show?"
   }
  ],
  "moves": [
   {
    "name": "Put On a Show",
    "text": "You can entertain people so they feel joy and forget their troubles. Say what you do and roll +Charm if it is pure performance, or +Weird if you add a pinch of magic. On 10+ the audience is transported and happy — troubles and trauma are eased in their minds, for a good while. On 7–9 pick one: the effect lasts only a little while, or it lasts the regular time but there is a ruckus when you are done.",
    "fixed": false
   },
   {
    "name": "A Negligible Price",
    "text": "You can make a magical deal to fulfil a desire for someone else. The price is that they reveal a secret to you; the world then arranges itself to fulfil their desire, fitting the scale of the secret.",
    "fixed": false
   },
   {
    "name": "Easygoin'",
    "text": "You have the gift of being friendly and easy to chat with. When you try to make a good impression on someone you have just met, roll +Charm. On 10+ they treat you as a trustworthy and friendly acquaintance. On 7–9 they open up more than usual but still regard you as a stranger. On 6 or less, they think you are playing them, and will not trust you or your companions.",
    "fixed": false
   },
   {
    "name": "Pay It Backward",
    "text": "Give yourself or someone else an advantage on any roll: roll three dice and take the best two for your result. Whenever you do this, the Chronicler gains 1 hold. That hold may be spent to give any hunter (but usually you) a disadvantage: roll three dice and take the worst two instead.",
    "fixed": false
   },
   {
    "name": "The Old Crew",
    "text": "You have an ally team of Show folk you worked with. They are great at setting up a scene, creating a distraction, or even intimidating folk.",
    "fixed": false
   },
   {
    "name": "The Game Is Fixed",
    "text": "When you work sorcery in a crowded and chaotic place (like a fairground), take +1 forward. You may also choose the following effects whenever you work sorcery: someone fails a skilled task; you disappear unnoticed and untraceable in a crowded and chaotic scene; you instantly set up or pack away a market stall or camp; track someone; get a bunch of coin.",
    "fixed": false
   }
  ],
  "pick": 2,
  "gear": "One camp tool, one vehicle, one mystical item, and all the paraphernalia. Camp tools (pick one): a pocket knife or multitool (1-harm hand useful small); a mallet (1-harm hand useful blunt); a crowbar (2-harm hand useful messy); a cricket bat or similar (2-harm hand); a hatchet (2-harm hand messy); a sock full of coins (1-harm hand stun). Vehicles (pick one): a cart; a wagon; a van-like wagon; a horse and sidecar. Mystical items (pick one): Ghost Shades — spectacles that can see into the spirit world (it seems darker than usual, obviously); a Really Big Plush Dog (animated) — somehow it came to life, rather like a regular dog; a Returning Coin — spend it, and it will come back in a day or so; a Scamulet — it heats up whenever someone is running a scam on you; a Wizard's Tent — worn and shabby outside, big and luxurious inside. Paraphernalia — you have all of this: tickets to a show, snack vouchers, decks of cards, pairs of dice, magic-trick props, camping gear, makeup, costume accessories.",
  "history": "This hunter worked the Show with you — ask for how long; it was at least a few months, time enough to become friends. / This hunter knew you as a child — ask what town you both hail from. Did you run away to join the Show? / 'No, I certainly did not rip you off in that town a few years back. Must have been a different show, friend.' / This hunter was chasing a cursed thing when the Show was in town, and thought it might be one of the crew — was it? How did you resolve things? / This hunter is an estranged family member — decide the exact relationship together. / Something got loose from the Show, a few years back, and this hunter ended up helping you secure it again — tell them what got loose, then ask how they ended up hunting it too. / A fortune-teller told you this hunter is part of your destiny — ask what the rest of the fortune said. / A strange old person pointed this hunter out to you when you were in a bad spot — ask why they helped you get back on track.",
  "improvements": "+1 Charm (max +3) · +1 Cool (max +2) · +1 Sharp (max +2) · +1 Weird (max +3) · Another Showmaster move · Gain an ally · Take another Show option · A move from another playbook · Get your own travelling show — take over your old one, or start anew",
  "trackers": [
   {
    "key": "favour",
    "label": "Infernal Favour",
    "boxes": 3,
    "note": "Only if your Show is an Infernal Power. Spend as Luck; the villain may restore them — at a terrible price."
   }
  ]
 },
 {
  "id": "traveller",
  "name": "The Far-Traveller",
  "orig": "Visitor",
  "group": "new",
  "quote": "It has been twenty-two turnings of the seasons since I arrived, and the locals continue to accept me as one of their own. There seems to be a cultural welcome involving holding out a small speaking-slate and staring.",
  "look": "Humanoid, large, small, odd proportions, clockwork, unusual form, ooze · Strange skin, antennae, big eyes, a strong scent, inhuman body temperatures, extra limbs · Futuristic, skintight, normal local clothes, incorrect 'normal local clothes', eclectic, an environmental suit",
  "ratings": [
   "Charm-2 Cool+1 Sharp+1 Tough 0 Weird+3",
   "Charm+1 Cool 0 Sharp-2 Tough+3 Weird+1",
   "Charm 0 Cool+1 Sharp+3 Tough+1 Weird-2",
   "Charm+1 Cool+3 Sharp+1 Tough-2 Weird 0",
   "Charm+3 Cool-2 Sharp 0 Tough+1 Weird+1"
  ],
  "luck": "When you spend a point of Luck, you learn about another culture, or someone else learns about your culture. This could be good or bad.",
  "features": [
   {
    "title": "Expatriation — what was your home like?",
    "text": "Pick one or more from at least two lines. Line 1: feudal, imperial, democratic, theocratic, mercantile, egalitarian, meritocratic. Line 2: a lone homeworld, a lone system, sky-habitats, interstellar, nomadic, scattered worlds. Line 3: a caste system, wartorn, tyrannical, peaceful, rationalist, high-craft, low-craft. Why did you leave? You had to escape; you are a scout, exploring new worlds; you are a tourist, looking for interesting experiences; you are an emissary; something else. Why have you stayed here? To befriend; to learn; to teach; to protect it; something else. What pulls you back home? Relationships; obligations; enemies; homesickness; something else."
   }
  ],
  "moves": [
   {
    "name": "Something Strange",
    "text": "You have an odd adaptation natural to you. Pick one: you breathe water as well as air and swim incredibly well; you have 1-armour and great strength; you can smell the difference between types of magic; you can glide and take no fall damage, and you do not trigger most weight sensors; something else (with the group's agreement).",
    "fixed": false
   },
   {
    "name": "Always Learning",
    "text": "When you make the effort to learn from someone of another culture, mark experience and take +1 ongoing to tasks tied to the lesson until the current voyage ends.",
    "fixed": false
   },
   {
    "name": "Being Neighbourly",
    "text": "At the beginning of each session, you may roll +Cool. On 10+ you are doing fine — locals provide you some useful resources or information. On 7–9 local friends can help, but they need something first. On a miss there are bad feelings: either from yourself, such as guilt when you mistakenly think you have upset someone, or from others, such as when you accidentally remind someone of painful history.",
    "fixed": false
   },
   {
    "name": "Different World, Different Rules",
    "text": "You have learned some of the rules and tricks that work here. When you are in conflict with a being less familiar with this world than you are, take +1 ongoing.",
    "fixed": false
   },
   {
    "name": "Taste of Home",
    "text": "When you and another hunter share something one of you loves that is new to the other, they explain how it is important to them or their culture. The other hunter picks one: relate a similar memory or element of your culture — each hunter gains +1 ongoing to aid each other until the voyage ends; relate a contrasting memory or element — each hunter marks experience; relate how this is entirely alien to you — each hunter gains +1 forward to search for clues or read a room, because it has put them in a questioning frame of mind.",
    "fixed": false
   },
   {
    "name": "Alien Anatomy",
    "text": "When you suffer harm from someone not from your homeworld, take 1 less harm.",
    "fixed": false
   },
   {
    "name": "Otherworldly Techniques",
    "text": "At the start of each session, you gain 2 hold. You can spend hold to gain +1 forward on a move when you use gear from your home culture.",
    "fixed": false
   }
  ],
  "pick": 3,
  "gear": "You have the vessel that brought you here, but it is broken — what does it look like? You also have: Far-traveller gear (pick two): an information crystal; a pocket medkit; a universal translator; an instant climate bubble; a food replicator with four recipes; a holographic disguise; a hoverbike; a portable power generator (enough to light a small town). A far-traveller weapon (pick one): a warp ray (2-harm close disorienting); a psionic blade (2-harm hand ignore-armour magic); a lightning rod (3-harm close messy); a freeze ray (0-harm close stun); a harvester gem (1-harm far energy life-drain); a destabilising seed (3-harm area messy loud). Local gear (pick two): a game board; a book of songs, full; an old music box; a speaking-slate; camping gear; a collection of portraits; favourite snacks; good shoes; a cart.",
  "history": "They were the first local resident you ever had a conversation with — was there a language barrier? What was the conversation about? / This hunter seems to know things about the history of your homeland you only vaguely know about. / Tests indicate that one of their ancestors was from your people — did you know this was possible? Have you told them? / You frequently have deep conversations with this hunter about your respective cultures. / It especially bothers you to be misunderstood by this hunter — you do not understand why. Ask if they have noticed. / One of the hunters has had a past experience with your people — ask whether it was a good experience or a bad one, and whether you were there. / How have you and this hunter shared hobbies from each other's upbringings? / One of you mistook the other for a threat people needed protecting from — decide together how that played out.",
  "improvements": "+1 Sharp (max +3) · +1 Weird (max +3) · +1 Tough (max +2) · +1 Charm (max +2) · +1 Cool (max +2) · Gain an ally: a far-traveller, a local animal, or a local friend · Another Far-Traveller move · A move from another playbook · Repair the vessel that brought you here, so it can safely travel the void and between worlds · Establish official, friendly contact between your people and the Coast"
 }
];
