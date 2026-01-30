"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useModal } from "@/components/providers/ModalProvider";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CheckCircle, X } from "lucide-react";

export default function LeadCaptureModal() {
  const { isModalOpen, closeModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    website: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resolvedTheme } = useTheme();

  // Show modal when triggered from context (Header button)
  useEffect(() => {
    if (isModalOpen) {
      setIsOpen(true);
    }
  }, [isModalOpen]);

  // Auto-show modal after 1 minute (60 seconds) - only if not manually opened
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const showModal = () => {
      if (!isOpen && !isModalOpen) {
        setIsOpen(true);
      }
    };

    // Show first time after 1 minute (60000ms) only if modal hasn't been opened manually
    if (!isModalOpen) {
      timer = setTimeout(showModal, 60000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, isModalOpen]);

  // Reset timer when modal is closed to show again after 1 minute (only if auto-triggered)
  useEffect(() => {
    if (!isOpen && !isModalOpen && !showSuccess) {
      const timer = setTimeout(() => {
        if (!isModalOpen) {
          setIsOpen(true);
        }
      }, 60000); // 1 minute (60000ms) after closing

      return () => clearTimeout(timer);
    }
  }, [isOpen, isModalOpen, showSuccess]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen || showSuccess) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, showSuccess]);

  const handleClose = () => {
    setIsOpen(false);
    closeModal();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Email validation
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        setErrors((prev) => ({ ...prev, email: "Please enter a valid email address" }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData({
      ...formData,
      phone: value,
    });
    // Phone validation (react-phone-input-2 includes country code, so we check for valid format)
    // Minimum should be country code + at least 7-10 digits
    if (value && value.length < 7) {
      setErrors((prev) => ({ ...prev, phone: "Please enter a valid phone number" }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address" }));
      return;
    }

    // Validate phone (react-phone-input-2 includes country code)
    if (!formData.phone || formData.phone.length < 7) {
      setErrors((prev) => ({ ...prev, phone: "Please enter a valid phone number" }));
      return;
    }

    setIsSubmitting(true);

    const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

    if (!formspreeEndpoint) {
      console.error("Formspree endpoint is not configured");
      alert("Form submission is not configured. Please contact support.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Formspree accepts form-encoded data
      const formDataToSend = new URLSearchParams();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('website', formData.website);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('_subject', `New Lead from ${formData.fullName}`);

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      // Reset form and show success message
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        website: "",
        message: "",
      });
      setErrors({ email: "", phone: "" });
      setShowSuccess(true);

      // Close success modal after 3 seconds and then close main modal
      setTimeout(() => {
        setShowSuccess(false);
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[103] flex items-center justify-center p-4 pointer-events-auto">
          <div className="fixed inset-0 bg-black/10 backdrop-blur-sm" onClick={() => setShowSuccess(false)} />
          <div className="relative bg-background rounded-2xl lg:rounded-3xl shadow-2xl max-w-md w-full p-8 border border-border/50">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-green-500" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
              <p className="text-muted-foreground mb-6">
                We've received your message and will get back to you soon.
              </p>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  setIsOpen(false);
                }}
                className="px-6 py-2 rounded-lg text-primary-foreground font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(to right, var(--primary), var(--accent), var(--primary))',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop with blur - Dark gray/black background */}
      <div
        className="fixed inset-0 z-[100] bg-gray-900/85 backdrop-blur-md transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Window/Torch Light Effects - Narrow diagonal beams from screen edges */}
      {/* Top Right Corner - Light beam pointing toward modal center */}
      <div
        className="fixed top-0 right-0 z-[101] pointer-events-none"
        style={{
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(to bottom left, rgba(147, 197, 253, 0.8) 0%, rgba(96, 165, 250, 0.6) 5%, rgba(59, 130, 246, 0.4) 12%, rgba(37, 99, 235, 0.25) 20%, rgba(29, 78, 216, 0.12) 30%, transparent 45%)',
          transformOrigin: 'top right',
          filter: 'blur(50px)',
          mixBlendMode: 'screen',
          clipPath: 'polygon(85% 0, 100% 0, 100% 15%, 50% 50%)',
        }}
      />
      {/* Bright core of top right beam */}
      <div
        className="fixed top-0 right-0 z-[101] pointer-events-none"
        style={{
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(to bottom left, rgba(255, 255, 255, 0.7) 0%, rgba(191, 219, 254, 0.5) 3%, rgba(147, 197, 253, 0.35) 8%, rgba(96, 165, 250, 0.2) 15%, transparent 25%)',
          transformOrigin: 'top right',
          filter: 'blur(25px)',
          mixBlendMode: 'screen',
          clipPath: 'polygon(90% 0, 100% 0, 100% 10%, 55% 45%)',
        }}
      />

      {/* Bottom Left Corner - Light beam pointing toward modal center */}
      <div
        className="fixed bottom-0 left-0 z-[101] pointer-events-none"
        style={{
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(to top right, rgba(147, 197, 253, 0.8) 0%, rgba(96, 165, 250, 0.6) 5%, rgba(59, 130, 246, 0.4) 12%, rgba(37, 99, 235, 0.25) 20%, rgba(29, 78, 216, 0.12) 30%, transparent 45%)',
          transformOrigin: 'bottom left',
          filter: 'blur(50px)',
          mixBlendMode: 'screen',
          clipPath: 'polygon(0 85%, 0 100%, 15% 100%, 50% 50%)',
        }}
      />
      {/* Bright core of bottom left beam */}
      <div
        className="fixed bottom-0 left-0 z-[101] pointer-events-none"
        style={{
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(to top right, rgba(255, 255, 255, 0.7) 0%, rgba(191, 219, 254, 0.5) 3%, rgba(147, 197, 253, 0.35) 8%, rgba(96, 165, 250, 0.2) 15%, transparent 25%)',
          transformOrigin: 'bottom left',
          filter: 'blur(25px)',
          mixBlendMode: 'screen',
          clipPath: 'polygon(0 90%, 0 100%, 10% 100%, 45% 55%)',
        }}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[102] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative bg-background rounded-2xl shadow-2xl max-w-xl w-full pointer-events-auto border border-border/50 overflow-visible"
          onClick={(e) => e.stopPropagation()}
        >

          {/* Modal Content */}
          <div className="p-2 sm:p-3">
            {/* Logo and Close Button Row */}
            <div className="flex items-center justify-between">
              <div className="flex-1"></div>
              {/* Logo */}
              <div className="flex-1 flex justify-center">
                <Image
                  src={resolvedTheme === "dark" ? "/logo-white.svg" : "/logo.svg"}
                  alt="Fast Line Logo"
                  width={140}
                  height={140}
                  className="transition-opacity duration-300"
                  priority
                />
              </div>
              {/* Close Button */}
              <div className="flex-1 flex justify-end">
                <button
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center pb-6">
              GET A FREE CONSULTANCY
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 pb-10">
              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                  placeholder="Full Name"
                />
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-border"
                      } bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200`}
                    placeholder="Email Address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone & Website */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
                <div>
                  <div className={`${errors.phone ? "border border-red-500 rounded-lg" : ""}`}>
                    <PhoneInput
                      country={"us"}
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      inputClass="!w-full !h-[48px] !py-3 !pr-4 !rounded-lg !border !border-border !bg-background !text-foreground !placeholder:text-muted-foreground focus:!outline-none focus:!ring-2 focus:!ring-ring focus:!border-transparent !transition-all !duration-200"
                      buttonClass="!bg-background !border !border-border !rounded-l-lg !h-[48px]"
                      dropdownClass="!bg-background !border !border-border"
                      containerClass="!w-full [&_.react-tel-input]:!h-[48px]"
                      inputProps={{
                        required: true,
                        name: "phone",
                        placeholder: "+1"
                      }}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                    placeholder="Website (Optional)"
                  />
                </div>
              </div>

              {/* Message */}
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 resize-none pb-2"
                placeholder="Message"
              />
            </form>
          </div>

          {/* Submit Button - Half inside, half outside modal */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none" style={{ transform: 'translateY(50%)' }}>
            <form onSubmit={handleSubmit} className="pointer-events-auto">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-base font-bold text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background: 'linear-gradient(to right, var(--primary), var(--accent), var(--primary))',
                  minWidth: '200px',
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = 'linear-gradient(to right, var(--primary-hover), var(--accent-hover), var(--primary-hover))';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = 'linear-gradient(to right, var(--primary), var(--accent), var(--primary))';
                  }
                }}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Now</span>
                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}