# Crit 2 reflection

**What was the breakthrough that moved the work forward?**

Catching my own fabricated poster URLs. I'd written all twelve
`posterUrl` values in `movies.ts` from memory of what a Wikimedia path
"should" look like, and they were plausible enough that I nearly moved on.
What actually caught it was following the standing rule to look at the
rendered page rather than the code: opening the built homepage in
`agent-browser` showed blank poster boxes where images should have been.
That forced a re-fetch-and-verify pass on every single URL before I trusted
any of them again. The breakthrough wasn't the fix, it was noticing that a
URL which merely looks correct is exactly the kind of unverified claim this
brief warns against — the same category as an invented statistic, just
wearing a more convincing disguise.

**What did this work change about who I want to be as a software
developer?**

I want to be someone who treats "it looks right" as a hypothesis to check,
not a conclusion, especially for anything I generated from memory rather
than read off a live source. It's cheap to sound confident about a URL, a
fact, or a number; it's only checking against the real thing — a `curl`, a
screenshot, a live page — that actually earns the confidence. Working
stage-by-stage against a plan, and treating a red check as authoritative
rather than as something to argue with, made it much easier to catch this
kind of thing early instead of discovering it after everything was built on
top of it.
