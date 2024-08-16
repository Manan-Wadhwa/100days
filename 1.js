// script.js
class Window {
    constructor(id, title, content) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.windowElement = this.createWindowElement();
        this.addEventListeners();
        this.isMinimized = false;
        this.isMaximized = false;
        this.originalSize = { width: 300, height: 200, top: null, left: null };
        this.zIndex = ++Window.zIndexCounter;
        this.windowElement.style.zIndex = this.zIndex;
        document.getElementById('desktop').appendChild(this.windowElement);
    }

    createWindowElement() {
        const windowDiv = document.createElement('div');
        windowDiv.classList.add('window');
        windowDiv.style.top = `${Math.random() * 400}px`;
        windowDiv.style.left = `${Math.random() * 600}px`;

        const titleBar = document.createElement('div');
        titleBar.classList.add('title-bar');

        const titleSpan = document.createElement('span');
        titleSpan.classList.add('title');
        titleSpan.textContent = this.title;

        const controlsDiv = document.createElement('div');
        controlsDiv.classList.add('controls');

        const minimizeButton = document.createElement('button');
        minimizeButton.classList.add('control-button');
        minimizeButton.textContent = '−';
        minimizeButton.addEventListener('click', () => this.minimize());

        const maximizeButton = document.createElement('button');
        maximizeButton.classList.add('control-button');
        maximizeButton.textContent = '□';
        maximizeButton.addEventListener('click', () => this.maximize());

        const closeButton = document.createElement('button');
        closeButton.classList.add('control-button');
        closeButton.textContent = 'X';
        closeButton.addEventListener('click', () => this.close());

        controlsDiv.appendChild(minimizeButton);
        controlsDiv.appendChild(maximizeButton);
        controlsDiv.appendChild(closeButton);

        titleBar.appendChild(titleSpan);
        titleBar.appendChild(controlsDiv);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');
        contentDiv.innerHTML = this.content;

        const resizeHandle = document.createElement('div');
        resizeHandle.classList.add('resize-handle');

        windowDiv.appendChild(titleBar);
        windowDiv.appendChild(contentDiv);
        windowDiv.appendChild(resizeHandle);

        return windowDiv;
    }

    addEventListeners() {
        const titleBar = this.windowElement.querySelector('.title-bar');
        titleBar.addEventListener('mousedown', (e) => this.onDragStart(e));

        this.windowElement.addEventListener('mousedown', () => {
            this.windowElement.style.zIndex = ++Window.zIndexCounter;
        });

        const resizeHandle = this.windowElement.querySelector('.resize-handle');
        resizeHandle.addEventListener('mousedown', (e) => this.onResizeStart(e));

        window.addEventListener('resize', () => {
            if (this.isMaximized) {
                this.windowElement.style.width = `${window.innerWidth}px`;
                this.windowElement.style.height = `${window.innerHeight}px`;
            }
        });
    }

    minimize() {
        if (this.isMinimized) {
            this.windowElement.querySelector('.content').classList.remove('hidden');
            this.isMinimized = false;
        } else {
            this.windowElement.querySelector('.content').classList.add('hidden');
            this.isMinimized = true;
        }
    }

    maximize() {
        if (this.isMaximized) {
            this.restore();
        } else {
            this.originalSize.width = this.windowElement.offsetWidth;
            this.originalSize.height = this.windowElement.offsetHeight;
            this.originalSize.top = this.windowElement.style.top;
            this.originalSize.left = this.windowElement.style.left;

            this.windowElement.style.top = '0';
            this.windowElement.style.left = '0';
            this.windowElement.style.width = `${window.innerWidth}px`;
            this.windowElement.style.height = `${window.innerHeight}px`;
            this.isMaximized = true;
        }
    }

    restore() {
        this.windowElement.style.width = `${this.originalSize.width}px`;
        this.windowElement.style.height = `${this.originalSize.height}px`;
        this.windowElement.style.top = this.originalSize.top;
        this.windowElement.style.left = this.originalSize.left;
        this.isMaximized = false;
    }

    close() {
        this.windowElement.remove();
    }

    onDragStart(e) {
        e.preventDefault();
        this.offsetX = e.clientX - this.windowElement.getBoundingClientRect().left;
        this.offsetY = e.clientY - this.windowElement.getBoundingClientRect().top;

        document.onmousemove = (e) => this.onDragging(e);
        document.onmouseup = () => this.onDragEnd();
    }

    onDragging(e) {
        if (!this.isMaximized) {
            this.windowElement.style.top = `${e.clientY - this.offsetY}px`;
            this.windowElement.style.left = `${e.clientX - this.offsetX}px`;
        }
    }

    onDragEnd() {
        document.onmousemove = null;
        document.onmouseup = null;
    }

    onResizeStart(e) {
        e.preventDefault();
        this.startWidth = this.windowElement.offsetWidth;
        this.startHeight = this.windowElement.offsetHeight;
        this.startX = e.clientX;
        this.startY = e.clientY;

        document.onmousemove = (e) => this.onResizing(e);
        document.onmouseup = () => this.onResizeEnd();
    }

    onResizing(e) {
        const newWidth = this.startWidth + (e.clientX - this.startX);
        const newHeight = this.startHeight + (e.clientY - this.startY);

        this.windowElement.style.width = `${newWidth}px`;
        this.windowElement.style.height = `${newHeight}px`;
    }

    onResizeEnd() {
        document.onmousemove = null;
        document.onmouseup = null;
    }
}

Window.zIndexCounter = 1;

document.getElementById('createWindow').addEventListener('click', () => {
    new Window(
        `window${Window.zIndexCounter}`,
        `Canvas ${Window.zIndexCounter}`,
        `<p>This is canvas window ${Window.zIndexCounter}.</p>`
    );
});
