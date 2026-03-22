"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle, MessageCircle, X } from "lucide-react"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type ModalStep = "whatsapp" | "otp" | "success"

// ---------------------------------------------------------------------------
// Dummy OTP generator – replace with real API call
// ---------------------------------------------------------------------------
function generateDummyOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// ---------------------------------------------------------------------------
// OTP Input – 6 individual boxes, auto-focus next / back on delete
// ---------------------------------------------------------------------------
function OtpInput({
  value,
  onChange,
}: {
  value: string[]
  onChange: (v: string[]) => void
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([])

  function handleKey(
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) {
    if (e.key === "Backspace") {
      if (value[idx]) {
        const next = [...value]
        next[idx] = ""
        onChange(next)
      } else if (idx > 0) {
        refs.current[idx - 1]?.focus()
      }
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, idx: number) {
    const char = e.target.value.replace(/\D/g, "").slice(-1)
    const next = [...value]
    next[idx] = char
    onChange(next)
    if (char && idx < 5) refs.current[idx + 1]?.focus()
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (!pasted) return
    e.preventDefault()
    const next = Array(6).fill("")
    pasted.split("").forEach((c, i) => { next[i] = c })
    onChange(next)
    refs.current[Math.min(pasted.length, 5)]?.focus()
  }

  return (
    <div className="flex justify-center gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] ?? ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKey(e, i)}
          onPaste={handlePaste}
          className="h-12 w-12 rounded-xl border-2 border-border bg-muted/50 text-center text-lg font-bold text-foreground outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-200"
        />
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Resend countdown
// ---------------------------------------------------------------------------
function ResendTimer({
  onResend,
}: {
  onResend: () => void
}) {
  const [seconds, setSeconds] = useState(180)

  useEffect(() => {
    if (seconds <= 0) return
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [seconds])

  if (seconds > 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Belum menerima OTP?{" "}
        <span className="font-medium text-foreground">
          Kirim ulang ({seconds}s)
        </span>
      </p>
    )
  }

  return (
    <p className="text-center text-sm text-muted-foreground">
      Belum menerima OTP?{" "}
      <button
        type="button"
        onClick={() => { setSeconds(180); onResend() }}
        className="font-semibold text-red-600 hover:underline"
      >
        Kirim Ulang
      </button>
    </p>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
interface BookingSidebarProps {
  price?: string
}

export function BookingSidebar({ price }: BookingSidebarProps) {
  const [agreed, setAgreed] = useState(false)
  const [phone, setPhone] = useState("")
  const [modalStep, setModalStep] = useState<ModalStep | null>(null)
  const [dummyOtp, setDummyOtp] = useState("")
  const [otpValue, setOtpValue] = useState<string[]>(Array(6).fill(""))
  const [otpError, setOtpError] = useState(false)

  function handleSubmitForm(e: React.FormEvent) {
    e.preventDefault()
    const otp = generateDummyOtp()
    setDummyOtp(otp)
    setOtpValue(Array(6).fill(""))
    setOtpError(false)
    setModalStep("whatsapp")
  }

  function handleSendWhatsApp() {
    // TODO: Call backend API to send OTP via WhatsApp to `phone`
    setModalStep("otp")
  }

  function handleResend() {
    const otp = generateDummyOtp()
    setDummyOtp(otp)
    setOtpValue(Array(6).fill(""))
    setOtpError(false)
  }

  function handleVerifyOtp() {
    const entered = otpValue.join("")
    if (entered === dummyOtp) {
      setModalStep("success")
    } else {
      setOtpError(true)
    }
  }

  function closeModal() {
    setModalStep(null)
    setOtpValue(Array(6).fill(""))
    setOtpError(false)
  }

  return (
    <>
      <aside className="sticky top-8 w-full lg:max-w-[320px]">
        {/* Price */}
        {price && (
          <div className="mb-4">
            <span className="text-sm font-semibold text-red-600">Starts From</span>
            <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
              {price}
            </p>
          </div>
        )}

        {/* Booking card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground">
            Booking Appointment
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Schedule a time to meet with our property expert and explore Quinland
            Grup products
          </p>

          <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmitForm}>
            {/* Name */}
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="Your Name"
                className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                required
                placeholder="+62"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="Email"
                className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring"
              />
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-foreground">
                Book Appointment Date
              </label>
              <input
                id="date"
                type="date"
                required
                className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring"
              />
            </div>

            {/* Checkbox */}
            <label className="flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 rounded border-border accent-red-600"
              />
              <span className="text-xs leading-relaxed text-muted-foreground">
                I agree to the terms and conditions that apply.*
              </span>
            </label>

            <p className="text-xs leading-relaxed text-muted-foreground">
              Quinland Grup will never sell or share your information with a third
              party
            </p>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              Submit
            </button>
          </form>
        </div>
      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* Modal Overlay                                                        */}
      {/* ------------------------------------------------------------------ */}
      {modalStep && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            {/* Close button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Tutup modal"
            >
              <X className="size-5" />
            </button>

            {/* ---- Step: WhatsApp ---- */}
            {modalStep === "whatsapp" && (
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="flex flex-col gap-1">
                  <h2 className="text-2xl font-bold text-foreground">Verifikasi OTP</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Kode OTP akan dikirimkan melalui WhatsApp ke nomor Anda
                  </p>
                </div>

                {/* WhatsApp card */}
                <div className="w-full rounded-2xl border border-border p-5 text-left shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-muted-foreground text-xs text-muted-foreground">
                      !
                    </span>
                    <p className="text-sm text-muted-foreground">
                      Kode OTP akan dikirim melalui WhatsApp ke{" "}
                      <span className="font-semibold text-foreground">{phone || "+62xxx"}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                  >
                    <MessageCircle className="size-4" />
                    Kirim via WhatsApp
                  </button>
                </div>

                {/* Dummy OTP hint – remove when backend is ready */}
                <p className="rounded-lg bg-yellow-50 px-4 py-2 text-xs text-yellow-700 ring-1 ring-yellow-200">
                  <span className="font-semibold">[DEV]</span> Dummy OTP:{" "}
                  <span className="font-mono font-bold tracking-widest">{dummyOtp}</span>
                </p>
              </div>
            )}

            {/* ---- Step: OTP Input ---- */}
            {modalStep === "otp" && (
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="flex flex-col gap-1">
                  <h2 className="text-2xl font-bold text-foreground">OTP</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Masukkan 6-digit kode OTP yang dikirim ke nomor
                  </p>
                  <p className="text-sm font-bold text-foreground">{phone || "+62xxx"}</p>
                </div>

                <OtpInput value={otpValue} onChange={(v) => { setOtpValue(v); setOtpError(false) }} />

                {otpError && (
                  <p className="text-sm font-medium text-red-600">
                    Kode OTP tidak sesuai. Silakan coba lagi.
                  </p>
                )}

                {/* Dummy OTP hint – remove when backend is ready */}
                <p className="rounded-lg bg-yellow-50 px-4 py-2 text-xs text-yellow-700 ring-1 ring-yellow-200">
                  <span className="font-semibold">[DEV]</span> Dummy OTP:{" "}
                  <span className="font-mono font-bold tracking-widest">{dummyOtp}</span>
                </p>

                <ResendTimer onResend={handleResend} />

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={otpValue.join("").length < 6}
                  className="w-full rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit
                </button>
              </div>
            )}

            {/* ---- Step: Success ---- */}
            {modalStep === "success" && (
              <div className="flex flex-col items-center gap-5 py-4 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="size-9 text-green-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-bold text-foreground">
                    Nomor Berhasil Diverifikasi
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Nomor WhatsApp{" "}
                    <span className="font-semibold text-foreground">{phone || "+62xxx"}</span>{" "}
                    telah berhasil diverifikasi. Tim kami akan segera menghubungi Anda.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  Selesai
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
