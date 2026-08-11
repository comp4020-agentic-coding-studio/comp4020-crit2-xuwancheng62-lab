# Crit 2 reflection

**What was the breakthrough that moved the work forward?**

The breakthrough was realising that the agent should not begin by writing
code. My initial idea — redesign the HOYTS website so that movies are easier
to discover, with four movie cards per row on desktop — left many decisions
undefined.

So instead of asking the agent to implement the website, I asked it to first
inspect the specification and repository and produce a PLAN.md. This exposed
decisions I had not considered: how many movies to include, which cinemas to
show, how navigation should be structured, whether trailers should be
embedded, and where the boundary between movie discovery and booking should
sit.

The important part was that I did not simply accept the plan. I reviewed and
corrected it before implementation — Canberra/ACT cinemas instead of
arbitrary flagship locations, four cards per row on desktop, navigation
limited to Movies and Cinemas, real booking kept outside the redesign. The
plan became a shared reference between my design intent and the agent's
implementation, rather than something I judged only afterwards.

**What did this work change about who I want to be as a software developer?**

I do not want to become a developer who simply writes prompts and accepts
generated code. As agents become more capable of implementation, I think the
developer's responsibility shifts toward defining the problem, setting
constraints, reviewing plans, and recognising when an agent has made a
technically reasonable but contextually wrong decision.

The agent produced a dark interface, responsive grid, reusable components and
static routes very quickly. But the decisions that mattered — homepage
movie-first, exactly four movies per row, no unnecessary promotional content,
discovery separated from booking — came from my judgement about the user
experience.

So I see agentic development less as "AI writes the software for me" and more
as a division of responsibility: the human provides intent, context and
judgement; the agent provides speed and implementation capability. My role is
not reduced by the agent writing more code — it makes the quality of my
decisions matter more.
