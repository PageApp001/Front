self.addEventListener('push', function(event) {
  const data = event.data.json();
  const options = {
      body: data.body,
      icon: data.icon,
      data: data.url
  };
  
  event.waitUntil(
      self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  const notification = event.notification;
  const action = event.action;

  if (action === 'close') {
      notification.close();
  } else {
      event.waitUntil(
          clients.openWindow(notification.data)
      );
      notification.close();
  }
});
