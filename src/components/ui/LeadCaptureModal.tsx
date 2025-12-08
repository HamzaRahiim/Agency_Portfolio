"use client";

import { useState, useEffect } from "react";

export default function LeadCaptureModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Show modal every 30 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const showModal = () => {
      setIsOpen(true);
    };

    // Show first time after 30 seconds
    timer = setTimeout(showModal, 120000);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  // Reset timer when modal is closed to show again after 30 seconds
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 30000); // 30 seconds after closing

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Replace with your actual API endpoint
    try {
      // Example API call
      // await fetch('/api/leads', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form and close modal
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsOpen(false);
      alert("Thank you! We'll get back to you soon.");
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
      {/* Backdrop with blur - Dark gray/black background */}
      <div
        className="fixed inset-0 z-[100] bg-gray-900/85 backdrop-blur-md transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Torch light effects from screen corners hitting the modal */}
      {/* Top Right Screen Corner - Torch light pointing to modal */}
      <div
        className="fixed top-0 right-0 z-[101] w-[800px] h-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(147, 197, 253, 0.4) 0%, rgba(96, 165, 250, 0.25) 20%, rgba(59, 130, 246, 0.15) 40%, transparent 70%)',
          transform: 'translate(30%, -30%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="fixed top-0 right-0 z-[101] w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(255, 255, 255, 0.3) 0%, rgba(191, 219, 254, 0.2) 15%, transparent 50%)',
          transform: 'translate(25%, -25%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Bottom Left Screen Corner - Torch light pointing to modal */}
      <div
        className="fixed bottom-0 left-0 z-[101] w-[800px] h-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom left, rgba(147, 197, 253, 0.4) 0%, rgba(96, 165, 250, 0.25) 20%, rgba(59, 130, 246, 0.15) 40%, transparent 70%)',
          transform: 'translate(-30%, 30%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="fixed bottom-0 left-0 z-[101] w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom left, rgba(255, 255, 255, 0.3) 0%, rgba(191, 219, 254, 0.2) 15%, transparent 50%)',
          transform: 'translate(-25%, 25%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[102] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative bg-background rounded-2xl lg:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto border border-border/50 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 lg:p-10 pb-6 sm:pb-8 lg:pb-10">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-bold text-foreground">
                  Fast Line
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-emerald-400 mt-1">
                  Build, Scale, Evolve
                </span>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center mb-6 sm:mb-8">
              GET A FREE CONSULTANCY
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 mb-0">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">🇺🇸</span>
                      <span className="text-sm text-muted-foreground">+1</span>
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-16 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 px-6 py-4 text-base sm:text-lg font-bold text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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

