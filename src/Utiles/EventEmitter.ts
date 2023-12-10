type EventCallback = (payload: any) => void;

const events: { [key: string]: EventCallback[] } = {};

export const POPUP_SHOWN = 'POPUP_SHOWN';
export const POPUP_HIDDEN = 'POPUP_HIDDEN';

export const EventEmitter = {
  on: (event: string, callback: EventCallback): (() => void) => {
    if (!event) {
      return () => {
      };
    }

    const eventKeys = event.split(',').map((e) => e.trim());
    const disposers: (() => void)[] = [];

    eventKeys.forEach((eventKey) => {
      if (!events[eventKey]) {
        events[eventKey] = [];
      }

      const length = events[eventKey].push(callback);

      disposers.push(() => {
        const callbacks = events[eventKey];
        if (callbacks) {
          callbacks.splice(length - 1, 1);
        }
      });
    });

    return () => disposers.forEach((dispose) => dispose());
  },

  trigger: (event: string, payload?: any): void => {
    if (!events[event]) {
      return;
    }
    events[event].forEach((callback) => callback(payload));
  },

  off: (event: string, callback?: EventCallback): void => {
    if (!events[event]) {
      return;
    }

    if (callback) {
      const index = events[event].indexOf(callback);

      if (index >= 0) {
        events[event].splice(index, 1);
      }
    } else {
      events[event] = [];
    }
  }
};