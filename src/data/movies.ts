// Real HOYTS "now showing" / "coming soon" lineup, sourced from hoyts.com.au
// on 2026-08-10. Classification, runtime and genre are copied facts (they
// can't be invented); synopses are written in my own words from the plot
// facts on hoyts.com.au and each film's Wikipedia page, not pasted from
// either. Poster art is real promotional artwork hosted on Wikipedia.
//
// Two Coming Soon titles have no Australian classification published yet on
// HOYTS's own site — that's recorded honestly as "Classification pending"
// rather than guessed.
export interface Movie {
  slug: string;
  title: string;
  classification: string;
  runtimeMinutes: number;
  genre: string;
  posterUrl: string;
  posterAlt: string;
  synopsis: string;
  trailerUrl?: string;
  hoytsUrl: string;
  status: "now-showing" | "coming-soon";
  releaseDate?: string;
}

export const movies: Movie[] = [
  {
    slug: "the-odyssey",
    title: "The Odyssey",
    classification: "M",
    runtimeMinutes: 172,
    genre: "Drama, Adventure",
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/The_Odyssey_%282026_film%29.jpg/500px-The_Odyssey_%282026_film%29.jpg",
    posterAlt: "The Odyssey (2026) theatrical poster",
    synopsis:
      "Twenty years after the fall of Troy, a king still hasn't made it home. Christopher Nolan's IMAX-shot epic follows Odysseus's monster-strewn voyage back to Ithaca, and the wife and kingdom that can't wait forever.",
    trailerUrl: "https://www.youtube.com/watch?v=D00esm0gGmU",
    hoytsUrl: "https://www.hoyts.com.au/movies/the-odyssey",
    status: "now-showing",
  },
  {
    slug: "spider-man-brand-new-day",
    title: "Spider-Man: Brand New Day",
    classification: "M",
    runtimeMinutes: 145,
    genre: "Action, Adventure",
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/8/85/Spider-Man_Brand_New_Day_poster.jpg/500px-Spider-Man_Brand_New_Day_poster.jpg",
    posterAlt: "Spider-Man: Brand New Day theatrical poster",
    synopsis:
      "Years after erasing himself from everyone's memory, Peter Parker is still swinging through a New York that doesn't know his name. When an unseen threat starts closing in on the people he gave up to protect, staying anonymous stops being an option.",
    trailerUrl: "https://www.youtube.com/watch?v=Tt5F0DQoWJA",
    hoytsUrl: "https://www.hoyts.com.au/movies/spider-man-brand-new-day",
    status: "now-showing",
  },
  {
    slug: "toy-story-5",
    title: "Toy Story 5",
    classification: "G",
    runtimeMinutes: 102,
    genre: "Animation, Adventure, Comedy",
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Toy_Story_5_poster.jpg/500px-Toy_Story_5_poster.jpg",
    posterAlt: "Toy Story 5 theatrical poster",
    synopsis:
      "A tablet called Lilypad turns up in Bonnie's room with better ideas about what's good for her than any toy ever had. Woody, Buzz and the rest of the gang have to work out where that leaves them: analog toys up against a screen that never needs winding down.",
    trailerUrl: "https://www.youtube.com/watch?v=pGJgpmGxn40",
    hoytsUrl: "https://www.hoyts.com.au/movies/toy-story-5",
    status: "now-showing",
  },
  {
    slug: "ice-cream-man",
    title: "Ice Cream Man",
    classification: "R18+",
    runtimeMinutes: 87,
    genre: "Horror",
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/1a/Ice_Cream_Man_%282026_film%29_poster.jpg/500px-Ice_Cream_Man_%282026_film%29_poster.jpg",
    posterAlt: "Ice Cream Man (2026) theatrical poster",
    synopsis:
      "A quiet lakeside town gets a new ice cream van one summer, and what it's selling doesn't stay sweet for long. Eli Roth's slasher turns a childhood staple into the thing everyone should have been afraid of.",
    trailerUrl: "https://www.youtube.com/watch?v=dj6u3tEFZww",
    hoytsUrl: "https://www.hoyts.com.au/movies/ice-cream-man",
    status: "now-showing",
  },
  {
    slug: "super-troopers-3",
    title: "Super Troopers 3",
    classification: "MA15+",
    runtimeMinutes: 100,
    genre: "Action, Comedy",
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/94/Super_Troopers_3_poster.jpg/500px-Super_Troopers_3_poster.jpg",
    posterAlt: "Super Troopers 3 theatrical poster",
    synopsis:
      "Farva's engagement to Thorny's sister should be the easy part of this wedding. Between Thorny trying to sabotage it and a drug ring the Troopers stumble into along the way, the ceremony is very much in doubt.",
    trailerUrl: "https://www.youtube.com/watch?v=_He_xCs92jk",
    hoytsUrl: "https://www.hoyts.com.au/movies/super-troopers-3",
    status: "now-showing",
  },
  {
    slug: "holy-days",
    title: "Holy Days",
    classification: "PG",
    runtimeMinutes: 101,
    genre: "Comedy, Drama",
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Holy_Days_film_poster.jpg/500px-Holy_Days_film_poster.jpg",
    posterAlt: "Holy Days theatrical poster",
    synopsis:
      "In 1970s New Zealand, a grieving boy convinced his mother is waiting for him on a snowy mountain talks three elderly nuns into helping him find her, and ends up saving their convent from closure along the way.",
    trailerUrl: "https://www.youtube.com/watch?v=nKL4c0keUqw",
    hoytsUrl: "https://www.hoyts.com.au/movies/holy-days",
    status: "now-showing",
  },
  {
    slug: "moana",
    title: "Moana",
    classification: "PG",
    runtimeMinutes: 115,
    genre: "Adventure, Family, Fantasy, Musical",
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Moana_%282026_film%29_poster.jpg/500px-Moana_%282026_film%29_poster.jpg",
    posterAlt: "Moana (2026 live-action) theatrical poster",
    synopsis:
      "Disney's live-action retelling sends Moana past the reef of her home island for the first time, alongside the demigod Maui, to put right what a generation of her ancestors couldn't.",
    trailerUrl: "https://www.youtube.com/watch?v=f7QZEMyOi-U",
    hoytsUrl: "https://www.hoyts.com.au/movies/moana",
    status: "now-showing",
  },
  {
    slug: "minions-and-monsters",
    title: "Minions & Monsters",
    classification: "PG",
    runtimeMinutes: 90,
    genre: "Animation, Comedy",
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Minions_%26_Monsters_poster.jpg/500px-Minions_%26_Monsters_poster.jpg",
    posterAlt: "Minions & Monsters theatrical poster",
    synopsis:
      "Decades before Gru, the Minions get their shot at 1920s Hollywood stardom, and lose it just as fast, after a stunt to save their movie accidentally unleashes real monsters on the city they were trying to entertain.",
    trailerUrl: "https://www.youtube.com/watch?v=EX8UukKBFn0",
    hoytsUrl: "https://www.hoyts.com.au/movies/minions-3",
    status: "now-showing",
  },
  {
    slug: "insidious-out-of-the-further",
    title: "Insidious: Out of the Further",
    classification: "M",
    runtimeMinutes: 106,
    genre: "Horror, Mystery, Thriller",
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Insidious_Out_of_the_Further_poster.jpg/500px-Insidious_Out_of_the_Further_poster.jpg",
    posterAlt: "Insidious: Out of the Further theatrical poster",
    synopsis:
      "A mother who can slip into the Further finds out the ability runs both ways, and that whatever lives there has started following her back.",
    trailerUrl: "https://www.youtube.com/watch?v=7euwGyCjT_g",
    hoytsUrl: "https://www.hoyts.com.au/movies/insidious-out-of-the-further",
    status: "coming-soon",
    releaseDate: "21 August 2026",
  },
  {
    slug: "practical-magic-2",
    title: "Practical Magic 2",
    classification: "Classification pending",
    runtimeMinutes: 130,
    genre: "Fantasy, Romance",
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Practical_Magic_2_poster.jpg/500px-Practical_Magic_2_poster.jpg",
    posterAlt: "Practical Magic 2 theatrical poster",
    synopsis:
      "Twenty-five years on, the Owens sisters' family curse turns out to have unfinished business. Sandra Bullock and Nicole Kidman return to deal with it.",
    trailerUrl: "https://www.youtube.com/watch?v=Ho10_4IX1jE",
    hoytsUrl: "https://www.hoyts.com.au/movies/practical-magic-2",
    status: "coming-soon",
    releaseDate: "10 September 2026",
  },
  {
    slug: "paw-patrol-the-dino-movie",
    title: "Paw Patrol: The Dino Movie",
    classification: "Classification pending",
    runtimeMinutes: 88,
    genre: "Animation, Adventure, Family",
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Paw_Patrol_The_Dino_Movie_poster.jpg/500px-Paw_Patrol_The_Dino_Movie_poster.jpg",
    posterAlt: "Paw Patrol: The Dino Movie theatrical poster",
    synopsis:
      "A storm strands the pups on an island that time, and Humdinger's mining operation, forgot: dinosaurs included. It's the team's biggest rescue yet, with a volcano on a deadline.",
    trailerUrl: "https://www.youtube.com/watch?v=xgI5iYmOf5Q",
    hoytsUrl: "https://www.hoyts.com.au/movies/paw-patrol-the-dino-movie",
    status: "coming-soon",
    releaseDate: "10 September 2026",
  },
  {
    slug: "harry-potter-and-the-philosophers-stone",
    title: "Harry Potter and the Philosopher's Stone (25th Anniversary)",
    classification: "PG",
    runtimeMinutes: 152,
    genre: "Adventure, Family, Fantasy",
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Harry_Potter_and_the_Philosopher%27s_Stone_banner.jpg/500px-Harry_Potter_and_the_Philosopher%27s_Stone_banner.jpg",
    posterAlt: "Harry Potter and the Philosopher's Stone theatrical poster",
    synopsis:
      "Back on the big screen for its 25th anniversary: an eleven-year-old finds out he's a wizard, boards a train to a school he didn't know existed, and starts uncovering what really happened to his parents.",
    hoytsUrl:
      "https://www.hoyts.com.au/movies/harry-potter-and-the-philosophers-stone",
    status: "coming-soon",
    releaseDate: "13 August 2026",
  },
];

export const nowShowing = movies.filter((m) => m.status === "now-showing");
export const comingSoon = movies.filter((m) => m.status === "coming-soon");
