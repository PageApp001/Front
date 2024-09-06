self.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || '/assets/icons/icon-72x72.png',
      badge: data.badge || '/assets/icons/badge.png',
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
  
    event.waitUntil(
      clients.openWindow('/') 
    );
  });
  