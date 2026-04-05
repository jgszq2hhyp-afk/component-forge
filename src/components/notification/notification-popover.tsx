// @source 21st.dev/r/chetanverma16/notification-popover
"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type Notification = {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
};

interface NotificationItemProps {
  notification: Notification;
  index: number;
  onMarkAsRead: (id: string) => void;
}

function NotificationItem({
  notification,
  index,
  onMarkAsRead,
}: NotificationItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      key={notification.id}
      className="p-4 hover:bg-[var(--muted)] cursor-pointer transition-colors motion-reduce:transform-none"
      onClick={() => onMarkAsRead(notification.id)}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {!notification.read && (
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
          )}
          <h4 className="text-sm font-medium text-[var(--foreground)]">
            {notification.title}
          </h4>
        </div>
        <span className="text-xs text-[var(--muted-foreground)]">
          {notification.timestamp.toLocaleDateString()}
        </span>
      </div>
      <p className="text-xs text-[var(--muted-foreground)] mt-1 ml-3.5">
        {notification.description}
      </p>
    </motion.div>
  );
}

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

function NotificationList({
  notifications,
  onMarkAsRead,
}: NotificationListProps) {
  return (
    <div className="divide-y divide-[var(--border)]">
      {notifications.map((notification, index) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          index={index}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </div>
  );
}

const dummyNotifications: Notification[] = [
  {
    id: "1",
    title: "New Message",
    description: "You have received a new message from John Doe",
    timestamp: new Date(),
    read: false,
  },
  {
    id: "2",
    title: "System Update",
    description: "System maintenance scheduled for tomorrow",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: "3",
    title: "Reminder",
    description: "Meeting with team at 2 PM",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    read: true,
  },
];

interface NotificationPopoverProps {
  notifications?: Notification[];
  onNotificationsChange?: (notifications: Notification[]) => void;
  className?: string;
}

export default function NotificationPopover({
  notifications: initialNotifications = dummyNotifications,
  onNotificationsChange,
  className,
}: NotificationPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleOpen = () => setIsOpen(!isOpen);

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((n) => ({
      ...n,
      read: true,
    }));
    setNotifications(updatedNotifications);
    onNotificationsChange?.(updatedNotifications);
  };

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    onNotificationsChange?.(updatedNotifications);
  };

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={toggleOpen}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] shadow-sm transition-colors hover:bg-[var(--muted)]"
      >
        <Bell size={16} />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--destructive)] rounded-full flex items-center justify-center text-xs border border-[var(--background)] text-white font-medium">
            {unreadCount}
          </div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop to close on outside click */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-80 max-h-[400px] overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-lg z-50 motion-reduce:transform-none"
            >
              <div className="p-4 border-b border-[var(--border)] flex justify-between items-center">
                <h3 className="text-sm font-medium text-[var(--foreground)]">
                  Notifications
                </h3>
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] rounded-md px-2 py-1 transition-colors"
                >
                  Mark all as read
                </button>
              </div>

              <NotificationList
                notifications={notifications}
                onMarkAsRead={markAsRead}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
