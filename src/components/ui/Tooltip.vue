<template>
  <span
    class="inline-flex relative"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
  >
    <!-- Trigger slot -->
    <slot />
  </span>
</template>

<script>
  export default {
    name: "Tooltip",
    props: {
      text: {type: String, required: true},
      position: {type: String, default: "top"}, // top, bottom, left, right
    },
    data() {
      return {
        tooltipEl: null,
        arrowEl: null,
      };
    },
    beforeDestroy() {
      if (this.tooltipEl?.parentNode) {
        this.tooltipEl.parentNode.removeChild(this.tooltipEl);
        this.tooltipEl = null;
        this.arrowEl = null;
      }
    },
    methods: {
      showTooltip() {
        if (!this.tooltipEl) {
          // Tooltip container
          this.tooltipEl = document.createElement("div");
          this.tooltipEl.className =
            "fixed z-50 px-2 py-1 text-xs bg-white rounded shadow whitespace-nowrap pointer-events-none transition-200 opacity-0";

          // Text
          this.tooltipEl.innerText = this.text;

          // Arrow
          this.arrowEl = document.createElement("div");
          this.arrowEl.className =
            "absolute w-2 h-2 bg-white";
          this.tooltipEl.appendChild(this.arrowEl);

          document.body.appendChild(this.tooltipEl);
        }

        this.updatePosition();

        // fade in
        requestAnimationFrame(() => {
          if (this.tooltipEl) this.tooltipEl.style.opacity = "1";
        });
      },
      hideTooltip() {
        if (this.tooltipEl) {
          this.tooltipEl.style.opacity = "0";
          setTimeout(() => {
            if (this.tooltipEl?.parentNode) {
              this.tooltipEl.parentNode.removeChild(this.tooltipEl);
              this.tooltipEl = null;
              this.arrowEl = null;
            }
          }, 200);
        }
      },
      updatePosition() {
        this.$nextTick(() => {
          if (!this.tooltipEl) return;

          const trigger = this.$el.getBoundingClientRect();
          const tooltip = this.tooltipEl.getBoundingClientRect();

          let top, left;

          switch (this.position) {
          case "bottom":
            top = trigger.bottom + window.scrollY + 8;
            left =
              trigger.left +
              trigger.width / 2 -
              tooltip.width / 2 +
              window.scrollX;
            this.arrowEl.style.top = "-4px";
            this.arrowEl.style.left = "50%";
            this.arrowEl.style.transform = "translateX(-50%) rotate(45deg)";
            break;

          case "left":
            top =
              trigger.top +
              trigger.height / 2 -
              tooltip.height / 2 +
              window.scrollY;
            left = trigger.left - tooltip.width - 8 + window.scrollX;
            this.arrowEl.style.top = "50%";
            this.arrowEl.style.right = "-4px";
            this.arrowEl.style.transform = "translateY(-50%) rotate(45deg)";
            break;

          case "right":
            top =
              trigger.top +
              trigger.height / 2 -
              tooltip.height / 2 +
              window.scrollY;
            left = trigger.right + 8 + window.scrollX;
            this.arrowEl.style.top = "50%";
            this.arrowEl.style.left = "-4px";
            this.arrowEl.style.transform = "translateY(-50%) rotate(45deg)";
            break;

          default: // top
            top = trigger.top - tooltip.height - 8 + window.scrollY;
            left =
              trigger.left +
              trigger.width / 2 -
              tooltip.width / 2 +
              window.scrollX;
            this.arrowEl.style.bottom = "-4px";
            this.arrowEl.style.left = "50%";
            this.arrowEl.style.transform = "translateX(-50%) rotate(45deg)";
          }

          this.tooltipEl.style.top = `${top}px`;
          this.tooltipEl.style.left = `${left}px`;
          this.tooltipEl.style.position = "absolute"; // ensures arrow positioning works
        });
      },
    },
  };
</script>
