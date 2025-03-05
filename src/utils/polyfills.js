// Polyfill for global object
if (typeof window !== 'undefined') {
  window.global = window;
}

// Ensure crypto is available
if (typeof window !== 'undefined' && !window.crypto) {
  window.crypto = {
    getRandomValues: function(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    }
  };
}