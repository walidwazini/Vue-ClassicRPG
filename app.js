
const getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}

function test(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            cpuHealth: 100,
            playerHp: 100,
            cpuHp: 100,
            currentRound: 0,
            winner: null,
            logMessages: []

        }
    },
    computed: {
        
        cpuBarStyles() {
            if (this.cpuHealth < 0) {
                return { width: '0%' }
            }
            return { width: this.cpuHealth + '%' }
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return { width: '0%' }
            }
            return { width: this.playerHealth + '%' }
        },
        toggleSpecialAttack() {
            return this.currentRound % 3 !== 0 || this.currentRound == 0
        },
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.cpuHealth <= 0) {
                this.winner = 'draw'
            } else if (value <= 0) {
                this.winner = 'CPU'
            }
        },
        cpuHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw'
            } else if (value <= 0) {
                this.winner = 'Player'
            }
        },
        
    },
    methods: {
        startGame(){
            this.playerHealth = 100
            this.cpuHealth = 100
            this.playerHp = 100
            this.cpuHp = 100
            this.currentRound = 0
            this.winner = null
            this.logMessages = []
        },
        // reference is attackMonster
        playerAttacks() {
            this.currentRound++
            const attackValue = getRandomValue(5, 12)
            this.cpuHealth -= attackValue
            this.cpuHp -= attackValue
            this.addLogMessage('Player','attack', attackValue)
            this.cpuAttacks()
            
        },
        specialAttack() {
            this.currentRound++
            const attackValue = getRandomValue(10, 25)
            this.cpuHealth -= attackValue
            this.cpuHp -= attackValue
            this.addLogMessage('Player','delivers special-attack', attackValue)
            this.cpuAttacks()
            
        },
        cpuAttacks() {
            const attackValue = getRandomValue(8, 15)
            this.playerHealth -= attackValue
            this.playerHp = this.playerHp - attackValue
            this.addLogMessage('CPU','attack', attackValue)
            // console.log(`Num: ${this.currentRound}`)
            // console.log(`%: ${this.currentRound % 3}`)
            // console.log(`/: ${this.currentRound / 3}`)
            // console.log(`Floor /: ${Math.floor(this.currentRound / 3)}`)
        },

        healPlayer() {
            const healValue = getRandomValue(6, 10)
            let condition1 = this.playerHealth + healValue > 100
            let condition2 = this.playerHp + healValue > 100
            if (condition1 || condition2) {
                this.playerHealth = 100
                this.playerHp = 100
            } else {
                this.playerHealth += healValue
                this.playerHp = this.playerHp + healValue
            }
            this.currentRound++
            console.log(this.playerHealth)
            this.addLogMessage('player','heals', healValue)
            this.cpuAttacks()
        },
        surrender(){
            this.winner = 'CPU'
        },
        addLogMessage(who,what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        },

        // Try to make with different hit points
        newAttack(min, max) {
            const attackValue = getRandomValue(min, max)
            this.cpuHealth -= attackValue
        },
    },
})

app.mount('#game')