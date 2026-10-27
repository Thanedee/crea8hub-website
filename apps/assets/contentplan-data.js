/* Crea8Hub 30-Day Content Plan Generator: idea bank.
   Each idea is "Title|Caption starter|format hint". Hints: r reel, c carousel, i single image, s story, p poll, l live, t text post.
   Tokens: {product} (or {product/fallback}), {offer}, {business}. {business} falls back to "us", so it only appears where "us" reads well. */
window.CP_DATA = {
  industries: {
    fintech: {
      label: "Fintech / banking", product: "our app", loc: "#Nigeria",
      tags: ["#PersonalFinance", "#MoneyTips", "#Fintech", "#NaijaFintech", "#Savings", "#NaijaBusiness"],
      ideas: {
        educate: [
          "Myth vs fact: 3 things people get wrong about BVN|Your BVN can't be used to take money from your account on its own. Clear up the three myths we hear most, one slide each.|c",
          "How to spot a fake credit alert in 10 seconds|Fake alerts still catch traders at shops and POS points. Show the three checks to do before releasing goods: balance, app notification and sender name.|r",
          "What happens when a transfer fails, step by step|Explain where the money sits, how long a reversal takes and when to contact support. Calm, clear and specific.|c",
          "Never share your OTP: who will ask for it and why|Walk through the usual tricks: fake customer care, 'wrong transfer' calls and prize messages. End with what we will never ask you for.|c",
          "Price breakdown: what ₦20,000 a month in savings becomes in a year|Show the simple maths, with and without interest, using {product}. No promises, just numbers.|c",
          "Savings vs investment: what's the difference?|A plain-language explainer for people new to money apps. Use one everyday example for each.|r"
        ],
        inspire: [
          "Why we started: the problem we kept seeing|Tell the story of the payment problem our founders kept running into, and what we built to fix it.|r",
          "The customer who made us rethink {product}|Share a real piece of feedback (with permission) and the change it led to. Show that you listen.|c",
          "What financial inclusion means to our team|Ask three staff members what it means in their own words. Keep the clips short and honest.|r",
          "Our promise on fees, in one sentence|State plainly what you charge and what you don't. Pin it if it lands well.|i",
          "A day without cash: how our team pays for everything|Follow a team member from bus fare to lunch to rent reminder, all done with transfers and cards.|r"
        ],
        entertain: [
          "When the transfer says 'successful' but they still want proof|A short skit about the screenshot dance every Nigerian knows. Keep it light and kind.|r",
          "Types of people at month end|A relatable carousel: the planner, the 'I'll start saving next month' friend and the one with 14 banking apps.|c",
          "Rate these money habits from 1 to 10|Five common habits, from round-ups to December budgets. Ask followers to score them.|p",
          "Guess the year: what these cost in 2015|Fuel, bread, data and a plate of rice. Ask people to guess before the reveal.|c",
          "Caption this: the face you make when the alert finally lands|Post a fun team photo and invite captions in the comments.|i"
        ],
        promote: [
          "{product} in 30 seconds|A quick screen recording that shows what {product} does and how to start. No jargon.|r",
          "How to open an account in under five minutes|Show every screen from download to first transfer. Mention which ID customers need.|r",
          "Three ways {product} saves you time this month|Pick three features that solve real daily tasks: bills, transfers and savings goals.|c",
          "Fees explained: what you pay and what's free|A simple table of charges. Being upfront builds trust and cuts support questions.|c",
          "Got questions about {product}? Ask us on WhatsApp|Invite people to send their questions and say when they can expect a reply.|s"
        ],
        community: [
          "What's your number one money goal for next month?|Ask a simple question and reply to every comment. Share the most common answers next week.|p",
          "Share your best saving tip and we'll feature the top five|Collect tips in the comments and repost the best ones, with credit.|t",
          "Ask us anything about transfers and fees|Open a question box and answer in a follow-up video or carousel.|s",
          "Tag the friend who always says 'send your account number'|A light, relatable prompt that gets people talking.|i",
          "Poll: do you save daily, weekly or monthly?|Use the answers to plan your next explainer post.|p"
        ],
        bts: [
          "Meet the team that answers your support chats|Introduce two support agents, what a typical shift looks like and the questions they get most.|r",
          "How we test a new feature before launch|Show a team review, a bug being fixed and the final check. Skip anything sensitive.|r",
          "Inside our fraud monitoring desk (no screens shown)|Explain in general terms how the team watches for unusual activity. Never show customer data.|c",
          "Our Monday stand-up in 60 seconds|A quick look at how the team plans the week.|r",
          "From idea to app update: the journey of one feature|Sketch, design, test, release. A carousel with one photo per stage.|c"
        ],
        proof: [
          "What customers say about {product}|Share three short reviews from app stores or social media, with permission.|c",
          "Customer story: how a market trader takes payments|Interview a real merchant (with consent) about their day and how they get paid.|r",
          "Your reviews, answered|Pick one positive and one critical review and respond openly to both.|c",
          "Numbers we're proud of this year|Share real, checkable figures such as your app rating or support response time. No inflated claims.|i",
          "How a customer organised their monthly budget|With permission, show how a customer set up bills and savings. Keep personal details private.|c"
        ]
      }
    },
    sports: {
      label: "Sports & fitness", product: "our programme", loc: "#Lagos",
      tags: ["#NaijaFitness", "#LagosFitness", "#FitFam", "#NaijaSports", "#SuperEagles", "#GymLife"],
      ideas: {
        educate: [
          "Three warm-up moves that prevent most injuries|Show each move slowly and say why it matters. Keep it under 30 seconds.|r",
          "How to train in Lagos heat without overdoing it|Timing, water and the warning signs to stop. Practical, not preachy.|c",
          "Myth vs fact: 'no pain, no gain'|Clear up three common training myths, one slide each.|c",
          "What to eat before a match or workout, Naija edition|Simple local options and when to eat them. Avoid medical claims.|c",
          "How to choose the right running shoes|Fit, grip and what matters for road vs pitch. Show the checks in-store.|r",
          "Price breakdown: what a month of {product} gets you|Sessions, coaching and extras, priced in naira. No hidden costs.|c"
        ],
        inspire: [
          "Why we started {business}|The story behind your gym, academy or brand, in your own words.|r",
          "Member transformation, in their words|A real member's journey, shared with permission. Focus on how they feel, not just how they look.|r",
          "The coach behind the results|Introduce a coach, their background and their training philosophy.|r",
          "From the streets to the pitch|Feature a young player you support and what football means to them.|r",
          "Our promise to every beginner|State plainly how you welcome people who are just starting out.|i"
        ],
        entertain: [
          "Predict the score: Super Eagles edition|Ask followers to predict the next match score. Shout out whoever gets it right.|p",
          "Types of people at the gym|A light, relatable carousel: the selfie champion, the 5am warrior and the one who only does arms.|c",
          "This or that: morning run or evening run?|A quick poll for easy engagement.|p",
          "Rate this five-a-side goal|Share a great goal from your community and ask for ratings.|r",
          "Things coaches hear every January|A light skit about new-year resolutions.|r"
        ],
        promote: [
          "{product} in 30 seconds|Show what a session looks like, who it's for and how to join.|r",
          "Book a free trial session this week|Explain how to book and what to bring. Make it easy to say yes.|s",
          "Three ways {product} fits a busy schedule|Early, lunchtime and evening options, or home workouts.|c",
          "Kit check: what's new this month|Show new kit or merchandise, with prices in naira.|c",
          "Got questions about {product}? Ask us on WhatsApp|Invite questions and say when they can expect a reply.|s"
        ],
        community: [
          "What's your fitness goal for this month?|Ask, reply to every comment and share common goals next week.|p",
          "Tag your workout partner|A simple prompt that brings friends into the conversation.|i",
          "Weekend community run or match: who's in?|Share the time, place and how to join. Post photos after.|t",
          "Share your progress photo and we'll feature the best|With permission, repost member progress and cheer them on.|t",
          "Ask our coach anything|Open a question box and answer in a follow-up video.|s"
        ],
        bts: [
          "A day in the life of our coach|From the 5am session to the last class of the day.|r",
          "How we set up for match day|Kit, pitch, warm-ups and team talk, in 60 seconds.|r",
          "Cleaning and kit check: how we keep the space safe|Show the routine members don't usually see.|r",
          "How we plan a training programme|Whiteboard, goals and adjustments, explained simply.|c",
          "Meet the team behind the front desk|Introduce the people who welcome members every day.|r"
        ],
        proof: [
          "What members say about {product}|Share three short reviews, with permission.|c",
          "Member story: six months on|A real member's progress, shared with consent. Be honest about the effort involved.|r",
          "Our academy players who moved up|Celebrate players who earned trials, scholarships or call-ups, with permission.|c",
          "Your reviews, answered|Respond openly to one positive and one critical review.|c",
          "Numbers we're proud of this year|Real, checkable figures, such as sessions run or members trained. No inflated claims.|i"
        ]
      }
    },
    retail: {
      label: "Retail & e-commerce", product: "our best-seller", loc: "#Nigeria",
      tags: ["#ShopOnline", "#ShopSmall", "#NaijaBusiness", "#ShopLocal", "#OnlineShoppingNigeria", "#Lagos"],
      ideas: {
        educate: [
          "How to choose the right size when you shop online|Show how to measure at home with a tape and compare with the size chart.|c",
          "Original vs fake: 3 things to check before you buy|Help customers spot copies using stitching, labels and packaging. Be specific.|c",
          "How our delivery works, from order to doorstep|Explain timelines for your city and outside it, delivery fees and how to track an order.|c",
          "Care guide: make {product} last longer|Simple washing, storage or charging tips that save customers money.|c",
          "Price breakdown: what ₦20,000 gets you in our store|Build three example baskets on the same budget. Helpful for gift buyers.|c",
          "Pay on delivery or pay online? The pros and cons|A neutral explainer that answers a question customers ask every day.|r"
        ],
        inspire: [
          "How we started: from one table to an online store|Tell your origin story in five photos or a short video.|r",
          "Why we only stock what we'd use ourselves|Explain how you choose products and what you say no to.|t",
          "Meet the makers behind {product/our products}|Introduce a supplier or craftsperson you work with, with their permission.|r",
          "Our packaging, explained|Show why you pack the way you do: protection, less waste and a note in every order.|r",
          "What our shop means to our street|A short story about your neighbours, customers and the area you serve.|c"
        ],
        entertain: [
          "Things customers say when they open their parcel|Recreate real (anonymous) reactions in a quick skit.|r",
          "This or that: pick your favourite|Put two products side by side and ask followers to choose.|p",
          "Guess the price|Show a product and ask for guesses in the comments before you reveal the price.|r",
          "Types of online shoppers|The 'add to cart and disappear' shopper, the 'is this still available?' one and more. Keep it friendly.|c",
          "One item, styled three ways|Show one piece styled for work, church and a weekend out.|r"
        ],
        promote: [
          "New in: {product/our latest arrivals}|Show it from every angle, give the price in naira and explain how to order.|c",
          "Best-sellers this month|Rank your top three products with one reason people buy each.|c",
          "Restock alert: {product} is back|Tell followers what's back, how many you have and how to order.|s",
          "Gift ideas at three price points|₦10,000, ₦25,000 and ₦50,000 options. It saves people time.|c",
          "Bundle and save: {product} plus the essentials|Show a ready-made bundle and the naira saving.|i"
        ],
        community: [
          "Show us how you styled it|Ask customers to share photos with your product and tag you. Repost the best with credit.|s",
          "Help us choose our next stock|Run a poll between two products you're considering.|p",
          "What should we restock first?|Let followers vote and reply to the comments.|p",
          "Your questions about sizing, answered|Collect questions in a story box and answer them in one post.|s",
          "Share your unboxing and we'll feature it|Invite customers to film opening their order.|t"
        ],
        bts: [
          "Packing orders on a busy Monday|A fast, satisfying video of orders being checked and packed.|r",
          "How we check every item before it ships|Show the quality checks that stop wrong or damaged items going out.|r",
          "A morning at the market sourcing new stock|Take followers along to see how you choose what to sell.|r",
          "Meet our dispatch partner|Introduce the rider or company that delivers your orders, with permission.|i",
          "Our photo set-up on a small budget|Show how you shoot product photos at home or in store.|r"
        ],
        proof: [
          "Customer reviews of the week|Screenshot three real reviews or DMs. Hide names unless you have permission.|c",
          "Delivered: where our orders went this week|Show a map or list of the cities you delivered to.|i",
          "Repeat customer story|Ask a loyal customer why they keep buying, and share their answer with consent.|r",
          "Unboxing from a real customer|Repost customer content with credit and a thank-you.|r",
          "The review that taught us something|Share honest feedback and what you changed because of it.|t"
        ]
      }
    },
    food: {
      label: "Food & restaurants", product: "our most-ordered dish", loc: "#Lagos",
      tags: ["#LagosFood", "#NigerianFood", "#LagosEats", "#FoodDelivery", "#NaijaFood", "#NaijaBusiness"],
      ideas: {
        educate: [
          "How to reheat jollof so it tastes fresh|A 30-second tip for leftovers. Practical and easy to share.|r",
          "What's in {product}?|List the ingredients and where they come from. Mention allergens clearly.|c",
          "Price breakdown: what ₦20,000 feeds|Show what that budget gets for a family of four or an office lunch.|c",
          "Pepper levels explained: mild, medium and 'are you sure?'|Help customers order the heat they actually want.|c",
          "How to store soup so it lasts the week|Freezer tips, portion sizes and how long each soup keeps.|c",
          "Delivery areas and times, in one post|A simple guide to where you deliver and the order cut-off times.|i"
        ],
        inspire: [
          "The recipe that started it all|Tell the story of the first dish you sold and who taught you to cook it.|r",
          "Why we cook with fresh ingredients every morning|Show the market run and explain why it matters to you.|r",
          "Meet our head cook|How they started, their favourite dish to make and what they eat on a day off.|r",
          "What a good meal means in our home|A warm, personal post about food and family.|t",
          "Our kitchen rules|Three things you never compromise on, such as cleanliness, portions and timing.|c"
        ],
        entertain: [
          "Rate this plate from 1 to 10|Post your best-looking dish and ask for honest scores.|p",
          "Party jollof or home jollof?|A light poll that always gets people talking.|p",
          "Things people say when they're 'not hungry'|A short, relatable skit.|r",
          "Guess the dish from the ingredients|Show the raw ingredients first, then reveal the plate.|r",
          "The sound of our grill on a Friday night|A 10-second close-up with no talking. Let the sizzle do the work.|r"
        ],
        promote: [
          "Today's special: {product/our chef's pick}|A close-up shot, the price in naira and how to order before the lunch rush.|r",
          "Lunch combos for the office|Show a combo for one and for a team of five, with prices.|c",
          "Pre-order for the weekend|Ask people to place weekend orders early and say when the list closes.|s",
          "Our menu, updated|A clean, readable menu image with prices. Pin it.|i",
          "Party trays for your next event|Show tray sizes, what's inside and how far ahead to book.|c"
        ],
        community: [
          "What should we add to the menu next?|Give three options and let people vote.|p",
          "Tag the friend who always says 'I'll just taste yours'|A fun prompt that brings in new eyes.|i",
          "Share a photo of your order and we'll repost it|Invite customers to tag you when they eat.|s",
          "What's your go-to Sunday meal?|An easy question that starts a conversation.|t",
          "Ask our chef anything|Collect questions and answer them in a short video.|s"
        ],
        bts: [
          "Day in the life of our kitchen during lunch rush|Follow one order from ticket to dispatch bike.|r",
          "Our 6am market run|Show how you choose tomatoes, peppers and protein.|r",
          "How we keep the kitchen clean|A short video of the closing routine. It builds trust.|r",
          "Packing a delivery so it arrives hot|Show your packaging and the steps that keep food warm and sealed.|r",
          "Meet the riders who bring your food|Introduce them, with permission, and say thank you.|i"
        ],
        proof: [
          "What customers said this week|Share three short reviews from DMs, Google or delivery apps.|c",
          "Office lunch regulars|With permission, feature a company that orders from you every week.|i",
          "Our Google rating, and what we're working on|Share your real rating and one thing you're improving.|i",
          "Repeat order of the week|With their OK, show a customer who orders the same thing every time, and why.|r",
          "The event we catered, start to finish|Photos of the set-up, the serving and the empty trays at the end.|c"
        ]
      }
    },
    beauty: {
      label: "Beauty & fashion", product: "our best-seller", loc: "#Lagos",
      tags: ["#NaijaStyle", "#LagosFashion", "#BeautyTips", "#MadeInNigeria", "#SkincareNigeria", "#AsoEbi"],
      ideas: {
        educate: [
          "How to find your skin type in two minutes|A simple at-home test and what each result means. Avoid medical claims.|r",
          "Three ways to tie a gele, beginner friendly|A step-by-step video for someone doing it for the first time.|r",
          "Ankara care: how to wash it so the colour lasts|Simple washing and drying tips.|c",
          "Myth vs fact: sunscreen for dark skin|Clear up the common myths in plain words.|c",
          "How to measure yourself for a custom fit|Show where to measure and how to send your sizes.|c",
          "Price breakdown: a full look for ₦20,000|Build a look and show what each piece costs.|c"
        ],
        inspire: [
          "The story behind our name|Explain where the name came from and what it means to you.|r",
          "Meet the hands that make {product/our pieces}|Introduce your tailor, stylist or formulator, with their permission.|r",
          "Why we design for real bodies and real weather|Talk honestly about fit, fabric and heat.|t",
          "Our first ever sale|A throwback to your first customer and what you've learned since.|c",
          "What beauty means to our team|Short clips from staff in their own words.|r"
        ],
        entertain: [
          "Owambe outfit check: rate it|Show three looks and ask followers to vote.|p",
          "Things stylists hear before a wedding|A light skit about last-minute requests.|r",
          "Get ready with me for a long day in traffic|A real routine that survives heat and a long commute.|r",
          "This or that: bold lip or nude?|A quick poll for easy engagement.|p",
          "Transformation in 15 seconds|A before-and-after reveal set to a trending sound.|r"
        ],
        promote: [
          "New collection: {product/our latest pieces}|Show each piece with its price and the sizes available.|c",
          "Book your appointment for the weekend|Show available slots and how to book on WhatsApp.|s",
          "Spotlight: {product/our most-loved piece}|Why customers keep buying it, with a close-up and the price.|r",
          "Complete the look|Pair one item with accessories and show the total price.|c",
          "Bridal and occasion packages|Show what's included in each package and how far ahead to book.|c"
        ],
        community: [
          "Show us your look and tag us|Repost customer photos with credit.|s",
          "Help us name our next shade or style|Give three name options and let followers vote.|p",
          "Ask a stylist: your questions answered|Collect questions in stories and reply in one post.|s",
          "What's your signature colour?|An easy question that starts a thread.|t",
          "Tag someone whose style you admire|A warm, positive prompt.|i"
        ],
        bts: [
          "From fabric to finished piece|A time-lapse of one outfit being made.|r",
          "Setting up for a bridal client at 5am|Show the early start and the kit you carry.|r",
          "How we test a new product before we sell it|Explain your checks honestly. No result claims.|c",
          "A day at the shop|Follow the team from opening to close.|r",
          "Our photo shoot, unfiltered|Bloopers and set-up shots from your latest shoot.|r"
        ],
        proof: [
          "Client looks this week|With consent, share before-and-after photos.|c",
          "Notes from our brides|Short quotes and a photo from the day, with permission.|c",
          "Customer of the week|Feature a customer wearing your piece, in their own words.|i",
          "Why one client keeps coming back|Ask a regular why they've booked with you for years.|r",
          "Your reviews, unedited|Share a mix of reviews exactly as they were written.|c"
        ]
      }
    },
    health: {
      label: "Health & wellness", product: "our most-booked service", loc: "#Nigeria",
      tags: ["#HealthTips", "#Wellness", "#HealthyLiving", "#NigeriaHealth", "#Fitness", "#SelfCare"],
      ideas: {
        educate: [
          "Five signs you need a check-up, even if you feel fine|Simple, general guidance with a reminder to see a professional.|c",
          "How much water do you need in this heat?|Practical tips for hot days and long commutes. General guidance, not medical advice.|r",
          "Myth vs fact: 3 things people get wrong about blood pressure|Correct common myths and encourage regular checks.|c",
          "A 10-minute workout you can do at home|Show each move clearly, with a beginner option.|r",
          "Price breakdown: what a basic health check costs with us|List what's included and the price in naira. Clear and honest.|c",
          "How to prepare for your first appointment|What to bring, what to expect and how long it takes.|c"
        ],
        inspire: [
          "Why we opened our doors|Tell the story of the gap in care or fitness you wanted to fill.|r",
          "Meet our lead practitioner|Their background, why they chose this work and what they want clients to know.|r",
          "What wellness looks like on a busy workday|Realistic habits, not perfect ones.|c",
          "Our promise to every client|Three commitments, such as privacy, clear prices and never rushing you.|i",
          "A note from our founder|A short, personal message about health and community.|t"
        ],
        entertain: [
          "Things people say on their first day at the gym|A light, kind skit.|r",
          "Healthy swap or not? Vote|Show two snacks, ask which is the better choice, then explain.|p",
          "Rate this smoothie from 1 to 10|Make a smoothie with local fruit and ask for honest opinions.|r",
          "Excuses we've all used to skip a workout|Relatable and encouraging, never shaming.|c",
          "Guess which meal has more sugar|Show two common meals and ask followers to guess.|p"
        ],
        promote: [
          "{product}: what's included and how to book|A clear summary with the price and booking steps.|c",
          "Book your slot this week|Show available times and how to book on WhatsApp.|s",
          "Corporate wellness for your team|Explain your package for companies and who it suits.|c",
          "First visit? Here's what to expect|Ease nerves by showing the process step by step.|r",
          "Membership options, compared|A simple table of plans and prices.|c"
        ],
        community: [
          "What's your health goal this month?|Ask followers to share one small goal.|t",
          "Weekly check-in: did you hit your steps?|A gentle accountability post.|p",
          "Ask our expert: send your questions|Collect questions for a Q&A session.|s",
          "Share your workout spot|Invite followers to show where they train, at home or outside.|s",
          "Join our free community walk|Invite people to a group walk or class.|i"
        ],
        bts: [
          "How we clean and prepare our rooms|Show the routine that keeps clients safe.|r",
          "A morning with our front-desk team|How they get ready for the day.|r",
          "Our staff training day|Show the team learning a new skill or procedure.|c",
          "Setting up for a group class|A time-lapse of the space getting ready.|r",
          "What our team eats for lunch|A real, relatable look at staff lunches.|r"
        ],
        proof: [
          "A client's story, shared with permission|One client's experience in their own words.|r",
          "What our clients say|Three short reviews from Google or social media.|c",
          "Milestones our members reached this month|Celebrate effort and consistency, not dramatic results.|c",
          "Our ratings, and what we're improving|Share your real ratings honestly.|i",
          "A thank-you note from a client|Share a card or message, with consent.|i"
        ]
      }
    },
    realestate: {
      label: "Real estate", product: "our latest listing", loc: "#Lagos",
      tags: ["#LagosRealEstate", "#RealEstateNigeria", "#PropertyNigeria", "#HomeOwnership", "#HouseHunting", "#NaijaBusiness"],
      ideas: {
        educate: [
          "Five documents to check before you buy land|C of O, survey plan, deed of assignment and more, explained simply.|c",
          "Rent or buy: what to think about|A balanced explainer with the questions to ask yourself.|c",
          "What Governor's Consent means and why it matters|A plain-language explainer with no legal jargon. Suggest speaking to a lawyer.|c",
          "Price breakdown: what you pay on top of the annual rent|Agency, legal, caution and service charges explained.|c",
          "How to spot a fake property listing|The warning signs, and how to check an agent is genuine.|r",
          "Questions to ask at a property inspection|A checklist people can save and use.|c"
        ],
        inspire: [
          "Why we got into real estate|Tell your story and the kind of client you want to serve.|r",
          "The first home we helped a family buy|A short, warm story, shared with permission.|r",
          "What 'home' means to our team|Short clips from staff.|r",
          "Our standards for every listing|What we check before we show a property.|c",
          "Building for the next 20 years|Share your view on quality and durability.|t"
        ],
        entertain: [
          "Things you hear at every house inspection|Light humour about the familiar lines. Keep it kind.|r",
          "Guess the rent|Show a property and ask for guesses before you reveal the price.|r",
          "Which kitchen would you choose?|A this-or-that poll with two photos.|p",
          "House hunting in one minute|A fast, funny montage of a search day.|r",
          "Dream home wishlist: pick one|Pool, boys' quarters, home office or a big compound?|p"
        ],
        promote: [
          "New listing: {product/see it first}|A walk-through video with the price, location and key features.|r",
          "Video tour, room by room|Show every room so people can decide before they book a visit.|r",
          "Payment plans, explained|Show how instalments work with an example in naira.|c",
          "Inspection day this Saturday|Invite people to book a slot on WhatsApp.|s",
          "Five reasons this area is worth a look|Roads, schools, markets and travel times. Keep it factual.|c"
        ],
        community: [
          "What matters most when you choose a home?|Run a poll: location, price, size or security.|p",
          "Ask us anything about buying or renting|Collect questions and answer them in a video.|s",
          "Share your house-hunting story|Invite followers to tell their best and worst experiences.|t",
          "Which area should we cover next?|Let followers vote on neighbourhoods.|p",
          "Tag someone looking for a new place|An easy share prompt.|i"
        ],
        bts: [
          "A day of property inspections|Follow an agent from the first viewing to the last.|r",
          "How we check documents before we list|Explain the checks in general terms.|c",
          "Site visit: progress on our latest project|Show real progress photos.|r",
          "Meet our team|Short introductions and what each person handles.|c",
          "Getting a home ready for photos|Show how you prepare and stage a property.|r"
        ],
        proof: [
          "Keys handed over this month|With permission, share photos of clients at handover.|i",
          "Client review: how the process felt|A short quote or video in their own words.|r",
          "Questions clients asked us, and our answers|Show that you're transparent.|c",
          "Before and after: a renovation we managed|Show the change room by room.|c",
          "Why clients refer their friends to us|Share real referral stories, with consent.|t"
        ]
      }
    },
    education: {
      label: "Education & training", product: "our next course", loc: "#Nigeria",
      tags: ["#Education", "#LearnOnline", "#NigerianStudents", "#Skills", "#EdTech", "#Careers"],
      ideas: {
        educate: [
          "Three study habits that actually help|Practical, tested tips such as spaced revision and short sessions.|c",
          "How to prepare for {product/your next exam} in four weeks|A simple weekly plan learners can save.|c",
          "Myth vs fact: you need a degree to work in tech|A balanced look at skills, portfolios and certificates.|c",
          "Free resource of the week|Share a useful free tool, book or website and how to use it.|i",
          "Price breakdown: what your course fee covers|Classes, materials, mentoring and certificate, line by line.|c",
          "How to write a CV that gets read|Five quick fixes, with before and after examples.|c"
        ],
        inspire: [
          "Why we started teaching|The story of your first class and why it matters to you.|r",
          "Meet our tutors|Short introductions and what they love about teaching.|r",
          "One learner's journey|With permission, share a learner's story in their own words. No promised outcomes.|r",
          "Our teaching approach, explained|What a class looks like and why you teach this way.|c",
          "A note to anyone thinking of starting again|An encouraging message for adult learners.|t"
        ],
        entertain: [
          "Things every student says the night before an exam|A light skit.|r",
          "Quiz: can you answer this in 10 seconds?|One question from your subject. Answers in the comments.|p",
          "What's on your study playlist?|Ask followers what they listen to while studying.|t",
          "Types of people in a group project|A friendly carousel.|c",
          "Tutor reacts to common mistakes|A funny but kind video.|r"
        ],
        promote: [
          "Enrolment is open: {product}|Dates, fees, format and how to register.|c",
          "Free trial class this week|Invite people to try a class before they pay.|s",
          "What you'll learn in {product}, week by week|A clear outline of the course.|c",
          "Payment plans for our courses|Explain the instalment options in naira.|i",
          "Ask us about {product} on WhatsApp|Invite questions about fit, timing and fees.|s"
        ],
        community: [
          "What do you want to learn this year?|Ask followers and reply to every answer.|t",
          "Share your study set-up|Invite photos of where people study.|s",
          "Poll: morning or night study?|An easy engagement post.|p",
          "Ask a tutor: your questions answered|Collect questions for a live session.|l",
          "Celebrate a classmate|Ask students to shout out someone who helped them.|t"
        ],
        bts: [
          "Preparing for class: a tutor's morning|Show lesson planning and set-up.|r",
          "How we design a new course|From outline to first class.|c",
          "Our classroom before the students arrive|A calm set-up video.|r",
          "Marking day|An honest look at how feedback is given.|r",
          "Meet the support team|The people who answer your enrolment questions.|i"
        ],
        proof: [
          "What our learners say|Three short reviews, shared with permission.|c",
          "Graduation day photos|Celebrate learners who completed a course.|c",
          "Learner project showcase|Share work students made in class, with credit.|c",
          "A message from a past student|A short video or quote.|r",
          "Our completion numbers this term|Share real figures only.|i"
        ]
      }
    },
    tech: {
      label: "Tech & SaaS", product: "our product", loc: "#Nigeria",
      tags: ["#NigeriaTech", "#SaaS", "#SmallBusinessTools", "#Productivity", "#TechInNigeria", "#Startups"],
      ideas: {
        educate: [
          "How to automate one boring task this week|A short tutorial using {product} or a free tool.|r",
          "Five shortcuts most people don't know|Practical tips for your product or a common tool.|c",
          "Myth vs fact: cloud software isn't safe for small businesses|Explain what to look for in security, plainly.|c",
          "What is an API? Explained with a restaurant|A simple explainer for non-technical buyers.|c",
          "Price breakdown: what ₦20,000 a month in software should do for you|Help buyers judge value.|c",
          "How to choose software for your business|A checklist people can save.|c"
        ],
        inspire: [
          "Why we built {product}|The problem you saw and why existing tools didn't solve it.|r",
          "Building software in Nigeria: what we've learned|Honest lessons on power, bandwidth and payments.|t",
          "Meet the engineer behind our latest feature|A short profile.|r",
          "Our product principles|Three rules you follow when you build.|c",
          "The first customer who believed in us|Share their story, with permission.|t"
        ],
        entertain: [
          "Developer vs designer: who wins?|A light skit about a familiar debate.|r",
          "Things founders say at 2am|Relatable, not hype.|c",
          "Guess the bug|Show a funny error message and ask what went wrong.|p",
          "Rate our desk set-ups|Show the team's desks and ask followers to rate theirs.|p",
          "When the power goes off mid-demo|A short, relatable skit.|r"
        ],
        promote: [
          "{product} in 60 seconds|A screen recording of the main feature.|r",
          "Book a free demo|Explain what happens in a demo and how to book.|s",
          "Feature spotlight: what's new this month|Show one update and who it helps.|r",
          "Plans and pricing, simply explained|A clear table in naira.|c",
          "Moving off spreadsheets? Here's how we help|Show a before-and-after workflow.|c"
        ],
        community: [
          "What tool could your team not live without?|Ask and reply to every answer.|t",
          "Feature request thread|Invite users to suggest improvements.|t",
          "Poll: remote, hybrid or office?|An easy engagement question.|p",
          "Ask our product team anything|Collect questions for a live Q&A.|l",
          "User tip of the week|Ask users to share how they use {product}.|s"
        ],
        bts: [
          "How we ship an update|From code review to release, in a carousel.|c",
          "Our weekly planning meeting|A quick look at how priorities are set.|r",
          "Our backup power set-up|A real look at how you stay online.|r",
          "Meet our support team|Who they are and how they handle requests.|i",
          "Whiteboard session: designing a new feature|Show the messy early stage.|r"
        ],
        proof: [
          "Customer case study: what changed for them|Share a real story, with permission and real numbers only.|c",
          "Reviews from our users|Three short quotes.|c",
          "Uptime and support response this month|Share real figures openly.|i",
          "Why a customer switched to us|A short video or quote.|r",
          "Businesses that use us (with permission)|Thank them publicly.|i"
        ]
      }
    },
    professional: {
      label: "Professional services", product: "our core service", loc: "#Nigeria",
      tags: ["#SMEsNigeria", "#BusinessTips", "#NaijaBusiness", "#SmallBusiness", "#Consulting", "#Entrepreneurship"],
      ideas: {
        educate: [
          "Five documents every small business should keep|A checklist worth saving.|c",
          "Business name or limited company? The difference|A plain explainer of the CAC registration options.|c",
          "Tax deadlines to know this quarter|Clear dates and who they apply to. Suggest getting advice for your case.|c",
          "Myth vs fact: you don't need a contract with friends|Explain why written agreements protect both sides.|c",
          "Price breakdown: what {product} costs and includes|Line by line, with no surprises.|c",
          "Three questions to ask before you hire a consultant|Help prospects choose well.|t"
        ],
        inspire: [
          "Why we started our practice|The clients you wanted to serve, and why.|r",
          "Meet our partners|Short profiles and what each one focuses on.|c",
          "Our values, in practice|Three examples of how you work with clients.|c",
          "The first client we ever served|A thank-you story, shared with permission.|t",
          "What good advice looks like|Your view on clarity and honesty.|t"
        ],
        entertain: [
          "Things clients say at year end|Light humour that respects clients.|c",
          "Guess the deadline|A quick quiz about filing dates.|p",
          "Expectation vs reality: running a small business|A friendly carousel.|c",
          "Our office playlist|Share what you listen to while you work and ask for theirs.|t",
          "Rate this filing system|Show a messy and a tidy folder and ask for scores.|p"
        ],
        promote: [
          "{product}: who it's for and how it works|A clear service summary with a price or starting price.|c",
          "Book a free 15-minute consultation|Explain what you'll cover and how to book.|s",
          "Packages for small businesses|Compare your packages simply.|c",
          "How our process works, step by step|From the first call to delivery.|c",
          "Send us your questions on WhatsApp|Invite prospects to ask before they commit.|s"
        ],
        community: [
          "What's your biggest business admin headache?|Ask, then reply with tips.|t",
          "Ask us anything: tax and compliance edition|Collect questions for a live or video answer.|l",
          "Poll: do you do your own books?|Easy engagement and useful research.|p",
          "Shout out a small business you love|Help your followers support others.|t",
          "Share your best productivity tip|Feature the best answers.|t"
        ],
        bts: [
          "How we prepare for a client meeting|Show the research and planning.|c",
          "Meet our admin team|The people who keep things running.|i",
          "A typical week at our office|A quick montage.|r",
          "How we keep your documents secure|Explain your process in general terms.|c",
          "Training day: what our team learned|Share one useful takeaway.|c"
        ],
        proof: [
          "Client testimonial of the month|A short quote, shared with permission.|i",
          "Case study: the problem, the work, the outcome|Keep it factual and approved by the client.|c",
          "Reviews from our clients|Three short quotes.|c",
          "Clients who've stayed with us for years|Celebrate long relationships.|c",
          "Our certifications and memberships|Show credentials that build trust.|i"
        ]
      }
    },
    events: {
      label: "Events & entertainment", product: "our next event", loc: "#Lagos",
      tags: ["#LagosEvents", "#Owambe", "#EventPlanning", "#LagosWeekend", "#EventsNigeria", "#LiveMusic"],
      ideas: {
        educate: [
          "How to plan an event in eight weeks|A timeline worth saving.|c",
          "Price breakdown: what a ₦2 million party budget covers|Venue, food, DJ, decor and more, line by line.|c",
          "Five questions to ask before you book a venue|A practical checklist.|c",
          "How to choose a colour theme for your owambe|Simple tips with examples.|c",
          "Ticket scams: how to buy safely|Only buy from official links. Show how to spot fakes.|r",
          "Event day checklist|What to pack and confirm the day before.|c"
        ],
        inspire: [
          "Why we love making events happen|Your story and the first event you ran.|r",
          "The team behind the night|Introduce your crew.|r",
          "An event that meant a lot to us|Share the story, with the client's permission.|r",
          "Our promise: on time and on brief|What clients can expect from us.|i",
          "Celebrating Nigerian creativity|Spotlight artists, decorators or performers you work with.|c"
        ],
        entertain: [
          "Owambe bingo|A fun card of things you always see at parties.|i",
          "Guess the song from the first three seconds|A quick, fun video.|r",
          "This or that: live band or DJ?|A quick poll.|p",
          "Best dance moves from last weekend|A highlight reel, shared with permission.|r",
          "Things MCs say at every party|A friendly skit.|r"
        ],
        promote: [
          "Tickets are live: {product}|Date, venue, price and how to buy.|c",
          "Last few dates left this quarter|Invite bookings and show which dates are free.|s",
          "Packages for weddings, birthdays and corporate events|A clear comparison with starting prices.|c",
          "Early-bird tickets: how it works|Explain the deadline and the price.|s",
          "Event recap: book us for yours|Highlights, and how to enquire.|r"
        ],
        community: [
          "Which artist should we bring next?|Let followers vote.|p",
          "Share your favourite photo from the event|Repost with credit.|s",
          "What makes a great party for you?|Ask, and reply to the comments.|t",
          "Tag who you're bringing|An easy share prompt for ticketed events.|i",
          "Ask us anything about planning your event|Collect questions for a live session.|l"
        ],
        bts: [
          "Setting up the venue: time-lapse|From empty hall to finished room.|r",
          "Sound check before the doors open|A quick behind-the-scenes clip.|r",
          "Planning meeting with a client|With consent, show how the process works.|c",
          "Our crew's day, start to finish|A day in the life.|r",
          "What's in our event emergency kit|A useful and fun list.|c"
        ],
        proof: [
          "What our clients said after the event|Short quotes, shared with permission.|c",
          "Highlights from last weekend|Photos or video, with tags.|r",
          "Review of the month|Share one full review.|i",
          "Vendors we love working with|Credit your partners and show your network.|c",
          "Numbers from our last show|Real attendance or ticket figures only.|i"
        ]
      }
    },
    fmcg: {
      label: "FMCG", product: "our flagship product", loc: "#Nigeria",
      tags: ["#MadeInNigeria", "#SupportLocal", "#NigerianBrands", "#NaijaBusiness", "#ShopLocal", "#EverydayEssentials"],
      ideas: {
        educate: [
          "Three ways to use {product} you haven't tried|Simple, practical uses at home.|c",
          "How to read a product label|Ingredients, NAFDAC number, expiry date and batch number.|c",
          "Price breakdown: how far one pack of {product} goes|Show servings or uses per pack in naira terms.|c",
          "How to store {product} so it lasts|Simple storage tips for hot weather.|c",
          "Original or fake: how to check|Show the packaging details and how to check the NAFDAC number.|r",
          "Quick recipe with {product}|A 30-second recipe video.|r"
        ],
        inspire: [
          "Made in Nigeria: where {product} comes from|Show sourcing or production, with permission.|r",
          "Our story, from first batch to supermarket shelf|A short history.|c",
          "Meet the people who make our products|Short staff profiles.|r",
          "Why quality checks matter to us|Explain your process simply.|c",
          "The farmers we buy from|A real story, with names used with consent.|r"
        ],
        entertain: [
          "Guess the product from the close-up|A fun quiz.|p",
          "Which flavour are you?|A light personality-style carousel.|c",
          "Things mums say when you finish the last pack|A relatable skit.|r",
          "Rate this combo|Pair your product with a snack and ask for scores.|p",
          "The perfect pour, in slow motion|A short sensory clip.|r"
        ],
        promote: [
          "Where to buy {product} near you|List stores, markets or online shops.|c",
          "New pack size: {product}|Show the new size and its price.|i",
          "Bulk buy for your shop|Explain trade prices and how retailers can order.|c",
          "Now available on delivery apps|Show where people can order.|s",
          "Bundle of the month|A ready bundle with the naira saving.|i"
        ],
        community: [
          "Show us how you use {product}|Repost customer photos with credit.|s",
          "Vote for our next flavour|Let followers decide.|p",
          "Share your family recipe using {product}|Feature the best one.|t",
          "Tag the friend who always has {product} at home|An easy share prompt.|i",
          "Shout out the local shop that stocks us|Help retailers and customers connect.|t"
        ],
        bts: [
          "Inside our factory (safe areas only)|Show production and hygiene checks.|r",
          "How {product} gets to your local shop|From warehouse to market.|c",
          "Quality control in action|What the team checks on every batch.|r",
          "Meet our sales reps on the road|A day visiting retailers.|r",
          "Our packaging design process|From sketch to shelf.|c"
        ],
        proof: [
          "Retailers who stock us|With permission, feature a shop owner.|i",
          "What customers say about {product}|Three short reviews.|c",
          "Our certifications|Show NAFDAC and other approvals clearly.|i",
          "Customer recipe of the week|Repost with credit.|r",
          "A milestone, and a thank-you|Share a real milestone, stated factually.|i"
        ]
      }
    },
    ngo: {
      label: "NGO / non-profit", product: "our current programme", loc: "#Nigeria",
      tags: ["#NonProfit", "#CommunityImpact", "#Volunteer", "#GiveBack", "#NigeriaNGO", "#SocialImpact"],
      ideas: {
        educate: [
          "The problem we work on, in numbers|Share sourced facts with links. Keep it human.|c",
          "Where your donation goes|Break down how funds are used.|c",
          "Myth vs fact about our cause|Clear up common misunderstandings.|c",
          "How to volunteer with us|Step by step: sign-up, training and what to expect.|c",
          "Price breakdown: what ₦20,000 provides|Show what that amount funds, using real costs.|c",
          "Your rights, and where to get help|Practical information for the people you serve.|c"
        ],
        inspire: [
          "Why we exist|The story of how your organisation started.|r",
          "Meet a volunteer|A short profile, with their permission.|r",
          "A day in the field|Show the work with consent and dignity.|r",
          "Our values in action|Three short examples.|c",
          "A letter from our director|A short, honest update.|t"
        ],
        entertain: [
          "Quiz: how much do you know about our cause?|Three questions, with answers in the next post.|p",
          "Volunteer bloopers|Light moments from your team, shared with permission.|r",
          "This or that: how would you spend a Saturday helping?|A light poll.|p",
          "Things volunteers say on their first day|A warm skit.|r",
          "Guess the year this photo was taken|A throwback from your archive.|i"
        ],
        promote: [
          "Support {product}|Explain the programme, the need and how to give.|c",
          "Volunteer sign-up is open|Dates, roles and how to apply.|s",
          "Partner with us|How companies can support your work.|c",
          "Give monthly: how it works|Explain recurring giving simply.|i",
          "Join our next event|Details and how to register.|s"
        ],
        community: [
          "Why does this cause matter to you?|Invite stories in the comments.|t",
          "Tag someone who'd make a great volunteer|An easy share prompt.|i",
          "Ask us anything about our work|Collect questions for a live session.|l",
          "Vote: which community should we visit next?|Involve supporters in decisions where you can.|p",
          "Thank-you wall for our donors|Name donors who agreed to be thanked publicly.|c"
        ],
        bts: [
          "Packing relief and supply kits|A short video of volunteers at work.|r",
          "Our weekly team meeting|How decisions are made.|r",
          "Preparing for a community visit|Planning and logistics.|c",
          "Meet the office team|Short introductions.|i",
          "How we report on our work|Show your monitoring process.|c"
        ],
        proof: [
          "This month's impact, in real numbers|Only figures you can verify.|c",
          "Stories from the people we serve|Shared with consent and dignity.|r",
          "The partners who make this possible|Thank partners publicly.|c",
          "Our latest report is out|Share the highlights and the link.|i",
          "A volunteer's reflection|In their own words.|r"
        ]
      }
    }
  },

  /* Shared ideas that suit any business. Used after the industry ideas. */
  generic: {
    educate: [
      "Five questions customers ask us every week|Answer the questions you hear most, one slide each.|c",
      "A beginner's guide to {product}|Explain what it is, who it's for and how to get started.|c",
      "Common mistakes to avoid|Three mistakes people make in your field and how to avoid them.|c",
      "Jargon buster: words we use, explained|Pick five terms from your industry and define them simply.|c",
      "One useful tip in 30 seconds|One tip people can use today.|r",
      "Save this checklist|A simple checklist your customers can screenshot and use.|i"
    ],
    inspire: [
      "Our mission, in plain words|One sentence on why you do what you do.|i",
      "Where we were a year ago|A throwback, and what has changed since.|c",
      "The values we hire for|What you look for in your team, with examples.|c",
      "Meet the founder|A short, honest introduction.|r",
      "A lesson we learned the hard way|An honest story that shows how you've grown.|t",
      "What keeps us going|A short reflection from the team.|r"
    ],
    entertain: [
      "Expectation vs reality|A friendly take on a common situation in your industry.|c",
      "Caption this|Share a fun photo from the team and invite captions.|i",
      "This or that|Two options, one vote. Keep it light.|p",
      "Throwback Thursday|An old photo and the story behind it.|i",
      "Trend remix|Use a current trending sound or format, tied to your business.|r",
      "Fill in the blank|'The best part of my weekend is ____.' Easy engagement.|t"
    ],
    promote: [
      "Why customers choose {business}|Three real reasons, backed by reviews.|c",
      "How to order or book, step by step|Make the process feel easy.|c",
      "{product}: the details|Price, what's included and how to get it.|i",
      "Questions people ask about {product}|Answer the common worries before they come up.|c",
      "Slots open this month|Only post this if it's true. Explain how to secure a slot.|s"
    ],
    community: [
      "Ask us anything|Open a question box and answer in a follow-up post.|s",
      "Your turn: share your experience|Invite stories in the comments.|t",
      "Help us decide|Let followers vote on a real decision you're making.|p",
      "Shout out a customer|Thank a loyal customer publicly, with permission.|i",
      "Weekend question|An easy question to start a conversation.|t",
      "Meet our community|Feature followers who join in often, with permission.|c"
    ],
    bts: [
      "A day in the life of our team|From opening to close in 60 seconds.|r",
      "A tour of our workspace|Show where the work happens.|r",
      "How we get ready for a busy week|Planning, stock and team briefings.|c",
      "Meet the newest member of our team|A short introduction.|i",
      "Tools we use every day|The kit and apps that keep you running.|c",
      "Bloopers from this week|Light moments, shared with permission.|r"
    ],
    proof: [
      "Reviews of the week|Share real reviews, with permission.|c",
      "Customer spotlight|A short story from a real customer.|r",
      "A milestone we're grateful for|Share a real milestone and thank your customers.|i",
      "In their words|A video or quote from a happy customer.|r",
      "How we help after you buy|Show how you support customers after the sale.|c",
      "Before and after|A real result you delivered, shown honestly.|c"
    ]
  },

  /* Used for some Promote posts when an offer is entered. */
  offer: [
    "{offer}: here's how it works|Explain the offer, who it's for, when it ends and how to claim it.|c",
    "{offer}, explained in 15 seconds|A quick video showing exactly what customers get.|r",
    "Reminder: {offer}|A short, clear reminder with the end date.|s",
    "Last chance: {offer}|Say when it ends and how to claim it. Only post this if the deadline is real.|s"
  ]
};
