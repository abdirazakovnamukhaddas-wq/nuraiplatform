import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
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
import { toast } from "sonner";

const schema = z.object({
  institution: z.string().trim().min(1).max(120),
  rep: z.string().trim().min(1).max(120),
  role: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(3).max(40),
  type: z.string().min(1),
  cameras: z.string().max(200).optional(),
  children: z.string().max(20).optional(),
  message: z.string().trim().max(1000).optional(),
  consent: z.literal(true),
});

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

export function DemoModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { t } = useI18n();
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const reset = () => {
    setForm(initial);
    setSuccess(false);
    setSubmitting(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setSuccess(true);
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

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setTimeout(reset, 200);
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        {success ? (
          <div className="flex flex-col items-center py-6 text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
              <CheckCircle2 className="h-7 w-7" aria-hidden />
            </span>
            <h3 className="mt-4 text-xl font-semibold text-foreground">
              {t("demo.f.success.title")}
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {t("demo.f.success.body")}
            </p>
            <Button className="mt-6" onClick={() => onOpenChange(false)}>
              {t("demo.f.close")}
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{t("demo.form.title")}</DialogTitle>
              <DialogDescription>{t("demo.form.subtitle")}</DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="mt-2 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="institution">{t("demo.f.institution")}</Label>
                <Input
                  id="institution"
                  value={form.institution}
                  onChange={(e) => update("institution", e.target.value)}
                  maxLength={120}
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="rep">{t("demo.f.rep")}</Label>
                  <Input
                    id="rep"
                    value={form.rep}
                    onChange={(e) => update("rep", e.target.value)}
                    maxLength={120}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">{t("demo.f.role")}</Label>
                  <Input
                    id="role"
                    value={form.role}
                    onChange={(e) => update("role", e.target.value)}
                    maxLength={120}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="email">{t("demo.f.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    maxLength={160}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">{t("demo.f.phone")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    maxLength={40}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>{t("demo.f.type")}</Label>
                <Select value={form.type} onValueChange={(v) => update("type", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="—" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((tp) => (
                      <SelectItem key={tp.v} value={tp.v}>
                        {tp.l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="cameras">{t("demo.f.cameras")}</Label>
                  <Input
                    id="cameras"
                    value={form.cameras}
                    onChange={(e) => update("cameras", e.target.value)}
                    maxLength={200}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="children">{t("demo.f.children")}</Label>
                  <Input
                    id="children"
                    inputMode="numeric"
                    value={form.children}
                    onChange={(e) => update("children", e.target.value)}
                    maxLength={20}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">{t("demo.f.message")}</Label>
                <Textarea
                  id="message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  maxLength={1000}
                />
              </div>
              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <Checkbox
                  checked={form.consent}
                  onCheckedChange={(v) => update("consent", v === true)}
                  className="mt-0.5"
                  required
                />
                <span>{t("demo.f.consent")}</span>
              </label>
              <Button type="submit" disabled={submitting} className="mt-2 w-full">
                {submitting ? t("demo.f.sending") : t("demo.f.submit")}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
