import React, { useEffect, ReactNode } from 'react';
import { EventEmitter } from "./EventEmitter";

type EventListenerProps = {
  event: string | string[];
  callback: (payload: any) => void;
  children?: ReactNode;
};

const EventListener: React.FC<EventListenerProps> = ({ event, callback, children }) => {
  useEffect(() => {
    const eventNames = Array.isArray(event) ? event.join(',') : event;
    EventEmitter.on(eventNames, callback);

    return () => EventEmitter.off(eventNames, callback);
  }, []);

  return <>{children}</>;
};

export default EventListener;