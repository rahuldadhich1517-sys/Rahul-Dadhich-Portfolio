import React, { useState } from "react";
import { Mail, Phone } from "lucide-react";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, message } = formData;

    const phoneNumber = "919351876909";

    const whatsappMessage = `Hello Rahul!

I would like to get in touch through your portfolio.

👤 Name: ${name}
📧 Email: ${email}

💬 Message:
${message}`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <section
      id="contact"
      className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-[#F9F9F7] overflow-hidden sharp-corners"
    >
      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#111111]/20 bg-[#CC0000]/20 text-[#CC0000] tracking-widest uppercase text-xs mb-8">
          06 / CONTACT
        </div>

        {/* Heading */}
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111111] leading-tight mb-6">
          LET'S BUILD
          <br />
          SOMETHING
          <br />
          USEFUL.
        </h2>

        {/* Description */}
        <p className="text-base md:text-lg text-[#737373] leading-relaxed mb-12 max-w-2xl">
          Have an idea? Let's talk.
        </p>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full max-w-lg text-left"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#737373] uppercase tracking-wider mb-2"
            >
              Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-[#111111] bg-transparent px-3 py-2 text-[#111111] font-medium focus:outline-none focus:border-[#CC0000] transition-colors"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#737373] uppercase tracking-wider mb-2"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-[#111111] bg-transparent px-3 py-2 text-[#111111] font-medium focus:outline-none focus:border-[#CC0000] transition-colors"
              placeholder="your@email.com"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[#737373] uppercase tracking-wider mb-2"
            >
              Message
            </label>

            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-[#111111] bg-transparent px-3 py-2 text-[#111111] font-medium resize-none focus:outline-none focus:border-[#CC0000] transition-colors"
              placeholder="Tell me about your project or idea..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#111111] text-[#F9F9F7] px-6 py-3 font-semibold uppercase tracking-widest rounded-none hover:bg-[#F9F9F7] hover:text-[#111111] hover:border hover:border-[#111111] transition-all duration-200"
          >
            START A CONVERSATION
          </button>
        </form>

        {/* Divider */}
        <div className="mt-10 w-full max-w-lg border-t border-[#111111]/20" />

        {/* Alternative Contact */}
        <div className="mt-8 flex flex-col items-center text-center">
          <p className="text-sm text-[#737373] mb-4">
            Or reach out directly:
          </p>

          {/* Email */}
          <div className="flex gap-2 items-center justify-center">
            <Mail className="w-5 h-5 text-[#CC0000]" />

            <a
              href="mailto:rahuldadhich1517@gmail.com"
              className="text-[#CC0000] font-medium hover:underline"
            >
              rahuldadhich1517@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div className="mt-3 flex gap-2 items-center justify-center">
            <Phone className="w-5 h-5 text-[#CC0000]" />

            <a
              href="tel:+919351876909"
              className="text-[#CC0000] font-medium hover:underline"
            >
              +91 9351876909
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
