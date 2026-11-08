<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep translations centralized in the i18n dictionaries, including investor edition overlays; English fallback and post-hydration storage restoration prevent missing labels and hydration mismatches.
- Keep form validation errors as translation keys and translate them at render time so language changes preserve input and immediately relocalize existing errors.
