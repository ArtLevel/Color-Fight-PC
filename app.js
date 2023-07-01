// Находим нужные элементы
const board = document.querySelector('#board')
const SQUARE_NUMBER = 1104

// Переменные которые отвечают за цвет ИИ и Обычных Square
const colorPcOne = 'rgb(99, 148, 189)' // blue
const colorPcTwo = 'rgb(108, 192, 92)' // green
const colorPcThree = 'rgb(235, 124, 116)'// red
const colorPcFour = 'rgb(180, 116, 235)' // purple

// Находим нужные элементы и создаём переменную времени
const btnStartGame = document.querySelector('#btn-start-game')
const timeGame = document.querySelector('#time-game')
let time = 200

// При клике вызываем функцию startGame
btnStartGame.addEventListener('click', () => startGame(btnStartGame))

// Функция отвечает за начало игры
function startGame(btn) {
	// Убираем кнопку
	btn.remove()

	for(let i = 0; i <= SQUARE_NUMBER; i++) {
		const square = document.createElement('div')
		square.className = 'square'
	
		// Вешаем на square event 'mouseover'. (При наведении закрашиваем square в цвет игрока)
		square.addEventListener('click', () => setColor(square))
	
		board.append(square)
	}

	timeGame.innerHTML = time

	// Через каждую секунду меняем счётчик времени
	setInterval(setTime, 1000)

	// Каждый setInterval будет иметь разное время и разный цвет
	// Каждый setInterval отвечает за определённый ИИ
	let intervalPcOne = setInterval(() => setColorPc(colorPcOne), setTimeOfPcTheSquareColor(5000))
	let intervalPcTwo = setInterval(() => setColorPc(colorPcTwo), setTimeOfPcTheSquareColor(5000))
	let intervalPcThree = setInterval(() => setColorPc(colorPcThree), setTimeOfPcTheSquareColor(5000))
	let intervalPcFour = setInterval(() => setColorPc(colorPcFour), setTimeOfPcTheSquareColor(5000))

	// Создаём переменную, которая отвечает за быстроту закрашивания всех ИИ
	let timeColorThePc = 0

	// Каждые 10 секунд очищаем setInterval, и записываем в них новое время
	setInterval(() => {
		if(i < 0) {
			// Очищаем все setInteral
			clearInterval(intervalPcOne)
			clearInterval(intervalPcTwo)
			clearInterval(intervalPcThree)
			clearInterval(intervalPcFour)

			// Увеличиваем перременную, которая отвечает за уменьшение времени закрашивания square, ИИ
			timeColorThePc += 400

			// Создаём новые setInterval с новой задержкой
			intervalPcOne = setInterval(() => setColorPc(colorPcOne), setTimeOfPcTheSquareColor(5000 - timeColorThePc))
			intervalPcTwo = setInterval(() => setColorPc(colorPcTwo), setTimeOfPcTheSquareColor(5000 - timeColorThePc))
			intervalPcThree = setInterval(() => setColorPc(colorPcThree), setTimeOfPcTheSquareColor(5000 - timeColorThePc))
			intervalPcFour = setInterval(() => setColorPc(colorPcFour), setTimeOfPcTheSquareColor(5000 - timeColorThePc))
		}
	}, 10000)
		
		// Находим таблицу
		const tableScore = document.querySelector('#table-score')

		// Выводим счёт всех ИИ, в виду таблицы
		setInterval(() => {
			// Создаём переменные счёта ИИ
			let squarePcOne = 0
			let squarePcTwo = 0
			let squarePcThree = 0
			let squarePcFour = 0

			// Находим все square в board
			const squareInBoard = board.querySelectorAll('div')

			// Подсчитываем сколько закрасил каждый ИИ square
			for(const square of squareInBoard) {
				// Проверяем в какой цвет закрашен square,
				// Даём +1 счёт тому ИИ, кто закрасил кубик
				switch(square.style.background) {
					case colorPcOne:
						squarePcOne++
						break
					case colorPcTwo:
						squarePcTwo++
						break
					case colorPcThree:
						squarePcThree++
						break
					case colorPcFour:
						squarePcFour++
						break
				}
			}

			tableScore.innerHTML = 
			`<table>
				<tbody>
					<tr>
						<td style="color: rgb(99, 148, 189);">
							Пк 1: ${squarePcOne}
						</td>
						<td style="color: rgb(108, 192, 92);">
							Пк 2: ${squarePcTwo}
						</td>
						<td style="color: rgb(235, 124, 116);">
							Пк 3: ${squarePcThree}
						</td>
						<td style="color: rgb(180, 116, 235);">
							Пк 4: ${squarePcFour}
						</td>
					</tr>
				</tbody>
			</table>`	
		}, 1000)
}

// Функция отвечает за закраску игроком square
function setColor(element) {
	// Проверка, если время вышло, то игрок закрашивать square не может
	if(i < 0) {
		element.classList.add('square-hero')
	}
}

// Функция отвечает за правельный подсчёт времени
function setTime() {
	// Проверяем закончилось ли время игры
	if(timeGame.innerHTML > 0) {
		if(timeGame.innerHTML <= 10) {
			timeGame.innerHTML = `0${--time}`
		} else {
			timeGame.innerHTML = --time
		}
	} else {
		finishGame()
	}
}

// Функция отвечает за закраску square ИИ
function setColorPc(color) {
	// Проверка, если время вышло, то ИИ закрашивать square не может
	if(i < 0) {
		// Получаем рандомный square и стилизуем его
		const square = randomSquareInBoard()
		square.style.background = color
		square.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
	}
}

// Функция отвечает за рандомное генерирование время для setItnerval (Определяет через какое время закрасится кубик)
function setTimeOfPcTheSquareColor(number) {
	const time = Math.floor(Math.random() * number)

	return time
}

// Переменная отвечает за оконцания игры
let i = -1

// Функция отвечает за конец игры
function finishGame() {
	i++
	if(i === 0) {
		// Создаём переменные счёта ИИ
		let squarePcOne = 0
		let squarePcTwo = 0
		let squarePcThree = 0
		let squarePcFour = 0

		// Находим все square в board
		const squareInBoard = board.querySelectorAll('div')

		// Подсчитываем сколько закрасил каждый ИИ square
		for(const square of squareInBoard) {
			// Проверяем в какой цвет закрашен square,
			// Даём +1 счёт тому ИИ, кто закрасил кубик
			switch(square.style.background) {
				case colorPcOne:
					squarePcOne++
					break
				case colorPcTwo:
					squarePcTwo++
					break
				case colorPcThree:
					squarePcThree++
					break
				case colorPcFour:
					squarePcFour++
					break
			}
		}

		// Находим finishGameScore (h3 в котором было время)
		const finishGameScore = document.querySelector('#finish-game-score')
		let winPc

		if(squarePcOne > squarePcTwo && squarePcOne > squarePcThree && squarePcOne > squarePcFour) {
			winPc = 'Пк 1'
		} else if(squarePcTwo > squarePcOne && squarePcTwo > squarePcThree && squarePcTwo > squarePcFour) {
			winPc = 'Пк 2'
		} else if(squarePcThree > squarePcOne && squarePcThree > squarePcTwo && squarePcThree > squarePcFour) {
			winPc = 'Пк 3'
		} else if(squarePcFour > squarePcOne && squarePcFour > squarePcTwo && squarePcFour > squarePcThree) {
			winPc = 'Пк 4'
		}

		finishGameScore.innerHTML += `<h3 style="color: #edd56a;">Победил ${winPc}</h3>`

	}
}
 
// Функция отвечает за выборку рандомного square из squareInBoard
function randomSquareInBoard() {
	const squareInBoard = board.querySelectorAll('div')
	const square = Math.floor(Math.random() * squareInBoard.length)

	return squareInBoard[square]
}
