# POTS open data: where to find help, and what the evidence says

Two small, hand-checked datasets about **POTS (postural orthostatic tachycardia syndrome)**, published by the team behind [SPLYT: POTS](https://splyt.fit/pots), a free iPhone and Apple Watch app for people living with POTS.

Free to reuse under **CC BY 4.0**. Please credit "SPLYT: POTS (splyt.fit/pots)".

## What's here

| File | Rows | What it is |
|---|---|---|
| `data/pots-help-directory.csv` / `.json` | 30 | Patient- and clinician-run organisations that help people find a POTS-literate doctor, get diagnosed, find community, get long-COVID care, or support someone. Covers 10 regions. Every link was opened and read by a person on the date in `checkedOn`. No individual doctors are listed. |
| `data/pots-figures.csv` | 17 | Headline numbers about POTS: how fast diagnoses rose after 2020, how long diagnosis takes, how often people are told it's anxiety, the most common symptoms. Each row links to its source. |
| `data/pots-treatment-evidence.csv` | 9 | Non-drug measures and off-label drugs, each with the evidence grade the guideline or trial gives it. |
| `data/pots-sources.csv` | 11 | Every study and guideline cited, with sample size and a link. |
| `data/pots-figures.json` | — | All of the above plus the diagnostic criteria, in one file. |

## House rules

- Every figure traces to a study, guideline or patient-organisation survey in `pots-sources.csv`, with its sample size. No figure is rounded up or taken from a secondary blog.
- Where the commonly quoted number is more flattering than the paper, we use the paper's version. The diagnostic delay is a **median of 2 years** with a long tail (a quarter wait 6+ years), not "an average of 6 years". The exercise-registry result is **71% of the people who finished**, out of 251 who started.
- **This is not medical advice.** It cannot diagnose anything. Treatment rows report what a named guideline or trial says, never an instruction.

## Also on

- Kaggle: https://www.kaggle.com/datasets/abihussain00/pots-open-data-find-help-cited-evidence
- Hugging Face: https://huggingface.co/datasets/sahussain887/pots-open-data
- The splyt.fit data index: https://splyt.fit/data

## Read it on the web

- Find help: https://splyt.fit/pots/help
- The numbers, with the papers: https://splyt.fit/pots/data
- Where to start, including the 10-minute stand test: https://splyt.fit/pots/start

## Rebuilding

The data is generated from the source files behind splyt.fit/pots:

```
node --experimental-strip-types scripts/build.mjs <path-to-splyt-web>
```

## About SPLYT: POTS

[SPLYT: POTS](https://apps.apple.com/us/app/splyt-pots/id6827389684) helps you track POTS against your own normal. It runs the stand test on your watch over three mornings, tracks fluids and salt against a target, logs how you feel in one tap, and turns it into a two-page report for your doctor. One "I need you" button reaches the people you choose. It's free, with no ads. It does not diagnose or treat any condition.

## Citation

See `CITATION.cff`. Corrections are welcome: open an issue.
