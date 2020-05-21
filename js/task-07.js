'use strict';

// Напиши скрипт управления личным кабинетом интернет банка.
// Есть объект account в котором необходимо реализовать методы для работы
// с балансом и историей транзакций.

/*
 * Типов транзакций всего два.
 * Можно положить либо снять деньги со счета.
 */
const Transaction = {
	DEPOSIT: 'deposit',
	WITHDRAW: 'withdraw',
};

/*
 * Каждая транзакция это объект со свойствами: id, type и amount
 */

const account = {
	// Текущий баланс счета
	balance: 0,

	// История транзакций
	transactions: [],

	/*
	 * Метод создает и возвращает объект транзакции.
	 * Принимает сумму и тип транзакции.
	 */
	createTransaction(amount, type) {
		const id = this.transactions.length + 1;

		const transaction = {
			id,
			amount,
			type,
		};

		return transaction;
	},

	/*
	 * Метод отвечающий за добавление суммы к балансу.
	 * Принимает сумму транзакции.
	 * Вызывает createTransaction для создания объекта транзакции
	 * после чего добавляет его в историю транзакций
	 */
	deposit(amount) {
		const deposit = this.createTransaction(amount, Transaction.DEPOSIT);
		this.transactions.push(deposit);
		this.balance += amount;
	},

	/*
	 * Метод отвечающий за снятие суммы с баланса.
	 * Принимает сумму транзакции.
	 * Вызывает createTransaction для создания объекта транзакции
	 * после чего добавляет его в историю транзакций.
	 *
	 * Если amount больше чем текущий баланс, выводи сообщение
	 * о том, что снятие такой суммы не возможно, недостаточно средств.
	 */
	withdraw(amount) {
		if (amount > this.balance) {
			console.log('Снятие такой суммы не возможно, недостаточно средств.');
		} else if (amount === 0) {
			console.log('Сумма снятия должна быть больше 0.');
		} else {
			const withdraw = this.createTransaction(amount, Transaction.WITHDRAW);
			this.transactions.push(withdraw);
			this.balance -= amount;
		}
	},

	/*
	 * Метод возвращает текущий баланс
	 */
	getBalance() {
		return this.balance;
	},

	/*
	 * Метод ищет и возвращает объект транзакции по id
	 */
	getTransactionDetails(id) {
		for (let i = 0; i < this.transactions.length; i += 1) {
			if (this.transactions[i].id === id) {
				return this.transactions[i];
			}
		}

		return 'Такого id не существует!';
	},

	/*
	 * Метод возвращает количество средств
	 * определенного типа транзакции из всей истории транзакций
	 */
	getTransactionTotal(type) {
		let transactionTypeTotal = 0;

		for (const key of this.transactions) {
			if (type === key.type) {
				transactionTypeTotal += key.amount;
			}
		}

		return transactionTypeTotal;
	},
};

console.log(account.deposit(500));
console.log(`Текущий баланс: ${account.getBalance()} USD`);
console.table(account.transactions);
console.log(account.withdraw(300));
console.log(`Текущий баланс: ${account.getBalance()} USD`);
console.table(account.transactions);
console.log(account.getTransactionDetails(1));
console.log(account.getTransactionDetails(5));
console.log(`Количество средств транзакций DEPOSIT: ${account.getTransactionTotal(Transaction.DEPOSIT)} USD`);
console.log(`Количество средств транзакций WITHDRAW: ${account.getTransactionTotal(Transaction.WITHDRAW)} USD`);
