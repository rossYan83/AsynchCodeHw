let interval1 = null;
        let counter1 = 0;
        
        function startTask1() {
            if (interval1) return;
            
            counter1 = 0;
            document.getElementById('output1').innerHTML = '';
            
            interval1 = setInterval(() => {
                counter1++;
                const output = document.getElementById('output1');
                const newMsg = document.createElement('div');
                newMsg.className = 'message';
                newMsg.textContent = `Повідомлення ${counter1}: Пройшло ${counter1} секунд`;
                output.appendChild(newMsg);
                
                if (counter1 >= 5) {
                    clearInterval(interval1);
                    interval1 = null;
                    const finalMsg = document.createElement('div');
                    finalMsg.className = 'message';
                    finalMsg.style.color = '#667eea';
                    finalMsg.style.fontWeight = 'bold';
                    finalMsg.textContent = '✓ Таймер зупинено після 5 повідомлень';
                    output.appendChild(finalMsg);
                }
            }, 1000);
        }
        
        function stopTask1() {
            if (interval1) {
                clearInterval(interval1);
                interval1 = null;
                const output = document.getElementById('output1');
                const msg = document.createElement('div');
                msg.className = 'message';
                msg.style.color = '#e74c3c';
                msg.textContent = '⏸ Таймер зупинено вручну';
                output.appendChild(msg);
            }
        }
        
        function resetTask1() {
            stopTask1();
            counter1 = 0;
            document.getElementById('output1').innerHTML = '';
        }
        
        let interval2 = null;
        let animationStep = 0;
        
        function startTask2() {
            if (interval2) return;
            
            const boxes = [
                document.getElementById('box1'),
                document.getElementById('box2'),
                document.getElementById('box3'),
                document.getElementById('box4')
            ];
            
            interval2 = setInterval(() => {
                animationStep++;
                
                boxes.forEach((box, index) => {
                    const phase = (animationStep + index) % 4;
                    
                    switch(phase) {
                        case 0:
                            box.style.transform = 'scale(1.3) rotate(0deg)';
                            box.style.borderRadius = '50%';
                            break;
                        case 1:
                            box.style.transform = 'scale(1) rotate(90deg)';
                            box.style.borderRadius = '10px';
                            break;
                        case 2:
                            box.style.transform = 'scale(0.8) rotate(180deg)';
                            box.style.borderRadius = '5px';
                            break;
                        case 3:
                            box.style.transform = 'scale(1.1) rotate(270deg)';
                            box.style.borderRadius = '25px';
                            break;
                    }
                });
            }, 500);
        }
        
        function stopTask2() {
            if (interval2) {
                clearInterval(interval2);
                interval2 = null;
                
                const boxes = document.querySelectorAll('.animated-box');
                boxes.forEach(box => {
                    box.style.transform = 'scale(1) rotate(0deg)';
                    box.style.borderRadius = '10px';
                });
            }
        }
    
        let gameInterval = null;
        let targetInterval = null;
        let gameTime = 15;
        let score = 0;
        
        function startGame() {
            if (gameInterval) return;
            
            score = 0;
            gameTime = 15;
            document.getElementById('score').textContent = score;
            document.getElementById('timeLeft').textContent = gameTime;
            const gameArea = document.getElementById('gameArea');
            gameArea.innerHTML = '';
            
            createTarget();
            
            targetInterval = setInterval(createTarget, 1000);
            
            gameInterval = setInterval(() => {
                gameTime--;
                document.getElementById('timeLeft').textContent = gameTime;
                
                if (gameTime <= 0) {
                    endGame();
                }
            }, 1000);
        }
        
        function createTarget() {
            const gameArea = document.getElementById('gameArea');
            const target = document.createElement('div');
            target.className = 'target';
            
            const maxX = gameArea.offsetWidth - 50;
            const maxY = gameArea.offsetHeight - 50;
            
            target.style.left = Math.random() * maxX + 'px';
            target.style.top = Math.random() * maxY + 'px';
            
            target.onclick = function() {
                score++;
                document.getElementById('score').textContent = score;
                this.remove();
            };
            
            gameArea.appendChild(target);
            
            setTimeout(() => {
                if (target.parentElement) {
                    target.remove();
                }
            }, 2000);
        }
        
        function endGame() {
            clearInterval(gameInterval);
            clearInterval(targetInterval);
            gameInterval = null;
            targetInterval = null;
            
            const gameArea = document.getElementById('gameArea');
            gameArea.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 24px; font-weight: bold; color: #667eea;">
                    🎮 Гра завершена! Ваш результат: ${score} очок
                </div>
            `;
        }
        

        let timeout4 = null;
        let countdown4 = null;
        let remainingTime = 0;
        
        function startTask4() {
            cancelTask4();
            
            const seconds = parseInt(document.getElementById('timeInput').value);
            if (isNaN(seconds) || seconds <= 0) {
                alert('Будь ласка, введіть коректне число секунд');
                return;
            }
            
            remainingTime = seconds;
            document.getElementById('output4').innerHTML = '';
            updateTimerDisplay();
            
            countdown4 = setInterval(() => {
                remainingTime--;
                updateTimerDisplay();
                
                if (remainingTime <= 0) {
                    clearInterval(countdown4);
                    countdown4 = null;
                }
            }, 1000);
            
            timeout4 = setTimeout(() => {
                const output = document.getElementById('output4');
                output.innerHTML = `
                    <div class="message" style="color: #27ae60; font-weight: bold; font-size: 18px;">
                        ⏰ Час вийшов! Минуло ${seconds} секунд.
                    </div>
                `;
                document.getElementById('timerDisplay').textContent = '';
            }, seconds * 1000);
        }
        
        function updateTimerDisplay() {
            const display = document.getElementById('timerDisplay');
            display.textContent = `⏱ Залишилось: ${remainingTime} секунд`;
        }
        
        function cancelTask4() {
            if (timeout4) {
                clearTimeout(timeout4);
                timeout4 = null;
            }
            if (countdown4) {
                clearInterval(countdown4);
                countdown4 = null;
            }
            document.getElementById('timerDisplay').textContent = '';
            document.getElementById('output4').innerHTML = '<div class="message" style="color: #e74c3c;">⏸ Таймер скасовано</div>';
        }
