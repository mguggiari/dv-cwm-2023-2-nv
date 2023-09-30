<script>
export default {
  name: "Cursos",
  methods: {
    getImagenUrl(nombreImagen) {
      return `/imagenes/${nombreImagen}`;
    },
  },
};
</script>

<template>
  <section>
    <div class="pb-64 bg-gray-100">
      <div class="max-w-7xl px-4 pt-20 mx-auto text-center sm:text-left">
        <h1 class="mb-3 text-4xl font-bold leading-tight text-gray-900 md:text-5xl md:font-extrabold">Plans & Pricing</h1>
        <p class="mb-10 text-lg text-gray-600 md:text-xl">5 minute installation · Try Team plan features for 14 days · No credit card required</p>
      </div>
    </div>
    <div class="max-w-7xl pb-20 mx-auto -mt-48">
      <div class="grid grid-cols-1 gap-16 lg:grid-cols-3 sm:gap-8">
        <div class="border-0 rounded-none shadow-none card sm:shadow-md sm:rounded-lg">
          <div class="flex flex-col justify-between p-6 border-b border-gray-200">
            <p class="mb-1 text-lg font-semibold text-gray-700">Free</p>
            <p class="pb-0 my-2 font-mono text-4xl font-extrabold text-gray-900 md:pb-2">$0</p>
            <a href="#" class="w-full mt-6 btn btn-primary btn-lg md:mt-16">Get Started</a>
          </div>
          <div class="flex flex-col flex-grow p-6 space-y-3">
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">Email APIs, SMTP Relay, and Webhooks</p>
            </div>
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">Suppression Management</p>
            </div>
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">Email Tracking and Analytics</p>
            </div>
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">99.99% Guaranteed Uptime SLA</p>
            </div>
          </div>
        </div>
        <div class="border-0 rounded-none shadow-none card sm:shadow-md sm:rounded-lg">
          <div class="flex flex-col justify-between p-6 border-b border-gray-200">
            <div>
              <p class="mb-1 text-lg font-semibold text-gray-700">Team</p>
              <p class="my-2 font-mono text-4xl font-extrabold text-gray-900" x-text="selected === 'monthly' ? '$9' : '$89'">$9</p>
              <p class="text-base text-gray-600" x-text="selected === 'monthly' ? 'user / month' : 'user / year'">user / month</p>
              <p class="text-base text-gray-600" x-text="selected === 'monthly' ? 'billed monthly' : 'billed yearly'">billed monthly</p>
            </div>
            <a href="#" class="w-full mt-6 btn btn-light btn-lg">Try for free</a>
          </div>
          <div class="flex flex-col flex-grow p-6 space-y-3">
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">Email APIs, SMTP Relay, and Webhooks</p>
            </div>
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">Suppression Management</p>
            </div>
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">Email Tracking and Analytics</p>
            </div>
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">99.99% Guaranteed Uptime SLA</p>
            </div>
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">5 Days of Log Retention</p>
            </div>
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">Limited 24/7 Ticket Support</p>
            </div>
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">1 Dedicated IP (Foundation 100k and up)</p>
            </div>
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">1,000 Email Address Validations</p>
            </div>
          </div>
        </div>
        <div class="border-0 rounded-none shadow-none card sm:shadow-md sm:rounded-lg">
          <div class="flex flex-col justify-between p-6 border-b border-gray-200">
            <div>
              <p class="mb-1 text-lg font-semibold text-gray-700">Company</p>
              <p class="my-2 font-mono text-4xl font-extrabold text-gray-900" x-text="selected === 'monthly' ? '$21' : '$189'">$21</p>
              <p class="text-base text-gray-600" x-text="selected === 'monthly' ? 'user / month' : 'user / year'">user / month</p>
              <p class="text-base text-gray-600" x-text="selected === 'monthly' ? 'billed monthly' : 'billed yearly'">billed monthly</p>
            </div>
            <a href="#" class="w-full mt-6 btn btn-light btn-lg">Try for free</a>
          </div>
          <div class="flex flex-col flex-grow p-6 space-y-3">
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">Email APIs, SMTP Relay, and Webhooks</p>
            </div>
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">Suppression Management</p>
            </div>
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">Email Tracking and Analytics</p>
            </div>
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">99.99% Guaranteed Uptime SLA</p>
            </div>
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">5 Days of Log Retention</p>
            </div>
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">Limited 24/7 Ticket Support</p>
            </div>
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">1 Dedicated IP (Foundation 100k and up)</p>
            </div>
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">1,000 Email Address Validations</p>
            </div>
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">Instant Chat Support</p>
            </div>
            <div class="flex items-start">
              <svg viewBox="0 0 20 20" fill="currentColor" class="flex-none w-4 h-4 mt-1 mr-2 text-green-600">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-gray-700">Custom Features</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="max-w-7xl px-4 py-24 mx-auto text-left md:text-center bg-white-100">
  <div class="grid grid-cols-1 gap-24 md:grid-cols-2">
    <div>
      <p class="mb-1 text-xs font-bold tracking-wide text-gray-500 uppercase">For Developers</p>
      <h1 class="mb-2 text-5xl font-bold leading-tight text-gray-900 md:font-extrabold">$9<span class="text-2xl font-medium text-gray-600"> per month</span></h1>
      <p class="mb-6 text-lg text-gray-600">
        One plan for any organization—from startups to Fortune 500s. We offer 50% off of for all students and universities. Please get in touch with us and provide proof of your status.
      </p>
      <div class="justify-center block space-x-0 space-y-2 md:flex md:space-x-2 md:space-y-0">
        <a href="#" class="w-full btn btn-primary btn-lg md:w-auto">Get Started</a>
        <a href="#" class="w-full btn btn-light btn-lg md:w-auto">Contact Us</a>
      </div>
    </div>
    <div>
      <p class="mb-1 text-xs font-bold tracking-wide text-gray-500 uppercase">For Designers</p>
      <h1 class="mb-2 text-5xl font-bold leading-tight text-gray-900 md:font-extrabold">$19<span class="text-2xl font-medium text-gray-600"> per month</span></h1>
      <p class="mb-6 text-lg text-gray-600">
        One plan for any organization—from startups to Fortune 500s. We offer 50% off of for all students and universities. Please get in touch with us and provide proof of your status.
      </p>
      <div class="justify-center block space-x-0 space-y-2 md:flex md:space-x-2 md:space-y-0">
        <a href="#" class="w-full btn btn-primary btn-lg md:w-auto">Get Started</a>
        <a href="#" class="w-full btn btn-light btn-lg md:w-auto">Contact Us</a>
      </div>
    </div>
  </div>
</section>

</template>