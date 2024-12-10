import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class WebSocketService {
    constructor() {
        this.client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            debug: function (str) {
                console.log('STOMP: ' + str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        this.handlers = {
            threads: [],
            queue: []
        };
    }

    connect() {
        if (this.client.connected) {
            return;
        }

        this.client.onConnect = () => {
            console.log('WebSocket bağlantısı başarılı');

            // Thread güncellemelerini dinle
            this.client.subscribe('/topic/threads/updates', (message) => {
                const threads = JSON.parse(message.body);
                this.handlers.threads.forEach(handler => handler(threads));
            });

            // Queue güncellemelerini dinle
            this.client.subscribe('/topic/queue/updates', (message) => {
                const queueStatus = JSON.parse(message.body);
                this.handlers.queue.forEach(handler => handler(queueStatus));
            });
        };

        this.client.activate();
    }

    addThreadHandler(handler) {
        this.handlers.threads.push(handler);
    }

    addQueueHandler(handler) {
        this.handlers.queue.push(handler);
    }

    removeThreadHandler(handler) {
        this.handlers.threads = this.handlers.threads.filter(h => h !== handler);
    }

    removeQueueHandler(handler) {
        this.handlers.queue = this.handlers.queue.filter(h => h !== handler);
    }

    disconnect() {
        if (this.client) {
            this.client.deactivate();
        }
    }
}

export const websocketService = new WebSocketService();