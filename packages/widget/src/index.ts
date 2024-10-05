interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description?: string;
  imageUrl?: string;
}

interface WidgetCustomizations {
  showImages: boolean;
  showVenue: boolean;
  showDate: boolean;
  showTime: boolean;
  showDescription: boolean;
  maxEvents: number;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  borderRadius: number;
  padding: number;
  dateFormat: string;
  timeFormat: string;
  ctaText: string;
  ctaUrl: string;
}

interface WidgetConfig {
  apiKey: string;
  container: string;
  widgetType: "styled" | "unstyled" | "data";
  customizations: Partial<WidgetCustomizations>;
  customCss?: string;
  customJs?: () => void;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

class LMXWidget {
  private config: Required<WidgetConfig>;
  private container: HTMLElement | null;
  private events: Event[] = [];

  constructor(config: WidgetConfig) {
    this.config = this.mergeConfig(config);
  }

  private mergeConfig(config: WidgetConfig): Required<WidgetConfig> {
    const defaults: Required<WidgetConfig> = {
      apiKey: "",
      container: "#lmx-event-widget",
      widgetType: "styled",
      customizations: {
        showImages: true,
        showVenue: true,
        showDate: true,
        showTime: true,
        showDescription: false,
        maxEvents: 5,
        primaryColor: "#000000",
        secondaryColor: "#ffffff",
        fontFamily: "Arial, sans-serif",
        borderRadius: 4,
        padding: 16,
        dateFormat: "yyyy-MM-dd",
        timeFormat: "HH:mm",
        ctaText: "Buy Tickets",
        ctaUrl: "",
      },
      customCss: "",
      customJs: () => {},
      onLoad: () => {},
      onError: () => {},
    };

    return {
      ...defaults,
      ...config,
      customizations: { ...defaults.customizations, ...config.customizations },
    };
  }

  public async init(): Promise<void> {
    try {
      this.container = document.querySelector(this.config.container!);
      if (!this.container) {
        throw new Error(`Container ${this.config.container} not found`);
      }
      const events = await this.fetchEvents();
      this.renderWidget();
      this.config.onLoad();
    } catch (error) {
      console.error("Error initializing LMX widget:", error);
    }
  }

  private async fetchEvents(): Promise<void> {
    const response = await fetch(
      `https://api.lmx.com/events?apiKey=${encodeURIComponent(this.config.apiKey)}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    this.events = await response.json();
  }

  private renderWidget(): void {
    const { customizations } = this.config;

    const widgetHtml = `
      <div class="lmx-widget">
        ${this.events
          .slice(0, customizations!.maxEvents)
          .map(
            (event) => `
          <div class="lmx-event">
            ${
              customizations!.showImages && event.imageUrl
                ? `
              <img src="${event.imageUrl}" alt="${event.title}" class="lmx-event-image">
            `
                : ""
            }
            <h3 class="lmx-event-title">${event.title}</h3>
            ${customizations!.showDate ? `<p class="lmx-event-date">${this.formatDate(event.date)}</p>` : ""}
            ${customizations!.showTime ? `<p class="lmx-event-time">${this.formatTime(event.time)}</p>` : ""}
            ${customizations!.showVenue ? `<p class="lmx-event-venue">${event.venue}</p>` : ""}
            ${
              customizations!.showDescription && event.description
                ? `
              <p class="lmx-event-description">${event.description}</p>
            `
                : ""
            }
            <a href="${customizations!.ctaUrl!.replace("{eventId}", event.id)}" class="lmx-event-cta">
              ${customizations!.ctaText}
            </a>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    this.container!.innerHTML = widgetHtml;
    this.applyStyles();
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return date.toLocaleDateString(undefined, options);
  }

  private formatTime(timeString: string): string {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleTimeString(undefined, options);
  }

  private applyStyles(): void {
    const { customizations } = this.config;
    const styles = `
      .lmx-widget {
        font-family: ${customizations!.fontFamily};
        background-color: ${customizations!.secondaryColor};
        color: ${customizations!.primaryColor};
        padding: 16px;
      }
      .lmx-event {
        margin-bottom: 20px;
      }
      .lmx-event-image {
        max-width: 100%;
        height: auto;
      }
      .lmx-event-cta {
        display: inline-block;
        background-color: ${customizations!.primaryColor};
        color: ${customizations!.secondaryColor};
        padding: 10px 15px;
        text-decoration: none;
        border-radius: 4px;
      }
    `;

    const styleElement = document.createElement("style");
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }
}

(window as any).LMXWidget = LMXWidget;
