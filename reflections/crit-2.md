# Crit 2 reflection

**What was the breakthrough that moved the work forward?**

The breakthrough was not simply creating a PLAN.md. It was moving important
decisions to a point before implementation. My initial idea — redesign the
HOYTS website so that movies are easier to discover, with four movie cards per
row on desktop — left much undefined, and asking the agent to inspect the
specification and repository and produce a plan first exposed assumptions that
would otherwise have become code silently: which cinemas to show, how many
titles to include, whether trailers should be embedded, and where the boundary
between movie discovery and booking should sit.

Reviewing those decisions let me correct the agent while changes were still
cheap. I chose Canberra/ACT cinemas rather than arbitrary flagship locations,
fixed the desktop layout at four cards per row, limited navigation to Movies
and Cinemas, and kept real booking outside the redesign. I realised that the
value of planning in agentic development is not the document itself, but the
opportunity it creates for human judgement before implementation.

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
