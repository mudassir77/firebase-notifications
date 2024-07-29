// src/components/NotificationList.tsx
import React from 'react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { NotificationData } from '../../types/notification/type';

interface NotificationListProps {
  notifications: NotificationData[];
  loading: boolean;
  onRead: (messageId: string) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications, loading, onRead }) => (
  <div className="w-[80%] h-[450px] bg-blue-300 rounded-md mb-5 px-3">
    <h1 className="text-center text-2xl font-bold my-2">Notifications</h1>
    <div className="overflow-y-auto h-[400px] pb-5">
      {
        notifications.map((notification, index) => (
          <div key={index} className="border-b-2 border-gray-500 p-2 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              {!notification.seen && <div className="w-3 h-3 rounded-2xl bg-red-600"></div>}
              <div className={`${notification.seen ? 'ml-20' : 'ml-16'}`}>
                <h2 className="text-lg font-semibold">{notification.notificationTitle}</h2>
                <p className="text-sm">{notification.notificationBody}</p>
              </div>
            </div>
            <MdOutlineRemoveRedEye className="text-2xl cursor-pointer" onClick={() => onRead(notification.messageId)} />
          </div>
        )).reverse()
      }
    </div>
  </div>
);

export default NotificationList;
