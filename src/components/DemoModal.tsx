import { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type FormState = {
  institution: string;
  rep: string;
  role: string;
  email: string;
  phone: string;
  type: string;
  cameras: string;
  children: string;
  message: string;
  consent: boolean;
};

const initial: FormState = {
  institution: "",
  rep: "",
  role: "",
  email: "",
  phone: "",
  type: "",
  cameras: "",
  children: "",
  message: "",
  consent: false,
};

type Errors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const REQUIRED: (keyof FormState)[] = [
  "institution",
  "rep",
  "role",
  "email",
  "phone",
  "type",
  "consent",
];

function buildSchema(t: (k: string) => string) {
  return z.object({
    institution: z.string().trim().min(1, t("demo.f.err.institution")).max(120),
    rep: z.string().trim().min(1, t("demo.f.err.rep")).max(120),
    role: z.string().trim().min(1, t("demo.f.err.role")).max(120),
    email: z.string().trim().email(t("demo.f.err.email")).max(160),
    phone: z
      .string()
      .trim()
      .min(3, t("demo.f.err.phone"))
      .max(40)
      .regex(/^[+\d][\d\s\-().]{2,}$/, t("demo.f.err.phone")),
    type: z.string().min(1, t("demo.f.err.type")),
    cameras: z.string().max(200).optional(),
    children: z.string().max(20).optional(),
    message: z.string().trim().max(1000).optional(),
    consent: z.literal(true, { message: t("demo.f.err.consent") }),
  });
}

export function DemoModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { t } = useI18n();
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && status === "idle") {
      // gentle autofocus after mount
      const id = window.setTimeout(() => firstFieldRef.current?.focus(), 60);
      return () => window.clearTimeout(id);
    }
  }, [open, status]);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (touched[k] || errors[k]) {
      // re-validate this field live
      const schema = buildSchema(t);
      const next = { ...form, [k]: v };
      const parsed = schema.safeParse(next);
      if (parsed.success) {
        setErrors((e) => ({ ...e, [k]: undefined }));
      } else {
        const issue = parsed.error.issues.find((i) => i.path[0] === k);
        setErrors((e) => ({ ...e, [k]: issue?.message }));
      }
    }
  };

  const markTouched = (k: keyof FormState) => {
    setTouched((s) => ({ ...s, [k]: true }));
    const schema = buildSchema(t);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const issue = parsed.error.issues.find((i) => i.path[0] === k);
      setErrors((e) => ({ ...e, [k]: issue?.message }));
    }
  };

  const resetAll = () => {
    setForm(initial);
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const schema = buildSchema(t);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Errors = {};
      const nextTouched: Partial<Record<keyof FormState, boolean>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!next[key]) next[key] = issue.message;
        nextTouched[key] = true;
      }
      setErrors(next);
      setTouched((s) => ({ ...s, ...nextTouched }));
      return;
    }
    setStatus("submitting");
    try {
      await new Promise((r) => setTimeout(r, 900));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const types = [
    { v: "rehab", l: t("demo.f.type.rehab") },
    { v: "school", l: t("demo.f.type.school") },
    { v: "health", l: t("demo.f.type.health") },
    { v: "gov", l: t("demo.f.type.gov") },
    { v: "social", l: t("demo.f.type.social") },
    { v: "ngo", l: t("demo.f.type.ngo") },
    { v: "other", l: t("demo.f.type.other") },
  ];

  const isReq = (k: keyof FormState) => REQUIRED.includes(k);
  const invalid = (k: keyof FormState) => Boolean(errors[k]);
  const errId = (k: keyof FormState) => `err-${k}`;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) window.setTimeout(resetAll, 200);
      }}
    >
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
        {status === "success" ? (
          <div className="flex flex-col items-center py-6 text-center animate-in fade-in-0 zoom-in-95 duration-300">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
              <CheckCircle2 className="h-7 w-7" aria-hidden />
            </span>
            <h3 className="mt-4 text-xl font-semibold text-foreground">
              {t("demo.f.success.title")}
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("demo.f.success.body")}
            </p>
            <Button className="mt-6" onClick={() => onOpenChange(false)}>
              {t("demo.f.close")}
            </Button>
          </div>
        ) : status === "error" ? (
          <div className="flex flex-col items-center py-6 text-center animate-in fade-in-0 zoom-in-95 duration-300">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertCircle className="h-7 w-7" aria-hidden />
            </span>
            <h3 className="mt-4 text-xl font-semibold text-foreground">
              {t("demo.f.error.title")}
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("demo.f.error.body")}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Button onClick={() => setStatus("idle")}>{t("demo.f.retry")}</Button>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {t("demo.f.close")}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{t("demo.form.title")}</DialogTitle>
              <DialogDescription>{t("demo.form.subtitle")}</DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} noValidate className="mt-2 grid gap-4">
              <Field
                id="institution"
                label={t("demo.f.institution")}
                required
                error={touched.institution ? errors.institution : undefined}
              >
                <Input
                  ref={firstFieldRef}
                  id="institution"
                  value={form.institution}
                  onChange={(e) => update("institution", e.target.value)}
                  onBlur={() => markTouched("institution")}
                  maxLength={120}
                  aria-required
                  aria-invalid={invalid("institution")}
                  aria-describedby={invalid("institution") ? errId("institution") : undefined}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="rep"
                  label={t("demo.f.rep")}
                  required
                  error={touched.rep ? errors.rep : undefined}
                >
                  <Input
                    id="rep"
                    value={form.rep}
                    onChange={(e) => update("rep", e.target.value)}
                    onBlur={() => markTouched("rep")}
                    maxLength={120}
                    aria-required
                    aria-invalid={invalid("rep")}
                    aria-describedby={invalid("rep") ? errId("rep") : undefined}
                  />
                </Field>
                <Field
                  id="role"
                  label={t("demo.f.role")}
                  required
                  error={touched.role ? errors.role : undefined}
                >
                  <Input
                    id="role"
                    value={form.role}
                    onChange={(e) => update("role", e.target.value)}
                    onBlur={() => markTouched("role")}
                    maxLength={120}
                    aria-required
                    aria-invalid={invalid("role")}
                    aria-describedby={invalid("role") ? errId("role") : undefined}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="email"
                  label={t("demo.f.email")}
                  required
                  error={touched.email ? errors.email : undefined}
                >
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    onBlur={() => markTouched("email")}
                    maxLength={160}
                    aria-required
                    aria-invalid={invalid("email")}
                    aria-describedby={invalid("email") ? errId("email") : undefined}
                  />
                </Field>
                <Field
                  id="phone"
                  label={t("demo.f.phone")}
                  required
                  error={touched.phone ? errors.phone : undefined}
                >
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    onBlur={() => markTouched("phone")}
                    maxLength={40}
                    aria-required
                    aria-invalid={invalid("phone")}
                    aria-describedby={invalid("phone") ? errId("phone") : undefined}
                  />
                </Field>
              </div>

              <Field
                id="type"
                label={t("demo.f.type")}
                required
                error={touched.type ? errors.type : undefined}
              >
                <Select
                  value={form.type}
                  onValueChange={(v) => {
                    update("type", v);
                    setTouched((s) => ({ ...s, type: true }));
                  }}
                >
                  <SelectTrigger
                    id="type"
                    aria-required
                    aria-invalid={invalid("type")}
                    aria-describedby={invalid("type") ? errId("type") : undefined}
                    className={cn(invalid("type") && "border-destructive focus-visible:ring-destructive/30")}
                  >
                    <SelectValue placeholder={t("demo.f.type.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((tp) => (
                      <SelectItem key={tp.v} value={tp.v}>
                        {tp.l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="cameras" label={t("demo.f.cameras")}>
                  <Input
                    id="cameras"
                    value={form.cameras}
                    onChange={(e) => update("cameras", e.target.value)}
                    maxLength={200}
                  />
                </Field>
                <Field id="children" label={t("demo.f.children")}>
                  <Input
                    id="children"
                    inputMode="numeric"
                    value={form.children}
                    onChange={(e) => update("children", e.target.value)}
                    maxLength={20}
                  />
                </Field>
              </div>

              <Field id="message" label={t("demo.f.message")}>
                <Textarea
                  id="message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  maxLength={1000}
                />
              </Field>

              <div className="grid gap-1">
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Checkbox
                    checked={form.consent}
                    onCheckedChange={(v) => {
                      update("consent", v === true);
                      setTouched((s) => ({ ...s, consent: true }));
                    }}
                    className="mt-0.5"
                    aria-required
                    aria-invalid={invalid("consent")}
                    aria-describedby={invalid("consent") ? errId("consent") : undefined}
                  />
                  <span>{t("demo.f.consent")}</span>
                </label>
                {touched.consent && errors.consent ? (
                  <p id={errId("consent")} className="pl-7 text-xs text-destructive">
                    {errors.consent}
                  </p>
                ) : null}
              </div>

              <Button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 w-full"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="mr-1.5 h-4 w-4 animate-spin" aria-hidden />
                    {t("demo.f.sending")}
                  </>
                ) : (
                  t("demo.f.submit")
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id} className="flex items-center gap-1">
        <span>{label}</span>
        {required ? (
          <span aria-hidden className="text-destructive">
            *
          </span>
        ) : null}
      </Label>
      {children}
      {error ? (
        <p id={`err-${id}`} className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
