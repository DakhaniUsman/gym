document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    const speed = 100; // Higher value = Slower counting

    const startCounter = (entry) => {
      const target = +entry.target.dataset.target;
      const updateCounter = () => {
        const current = +entry.target.innerText;
        const increment = Math.ceil(target / speed);

        if (current < target) {
          entry.target.innerText = current + increment;
          setTimeout(updateCounter, 50); // Adjust update interval (higher = slower)
        } else {
          entry.target.innerText = target;
        }
      };
      updateCounter();
    };

    // Intersection Observer to trigger counting when in viewport
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounter(entry);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% visible
      }
    );

    counters.forEach((counter) => observer.observe(counter));
  });
