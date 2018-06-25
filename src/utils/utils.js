class Utils {
    addLeadingZero(num, length) {
        const numLen = (num + '').length;
        const nZerosToAdd = Math.max(length - numLen, 0);
    
        return Array(nZerosToAdd + 1).join('0') + num;
    }
    timestampToString(ts) {
        const date = new Date(ts);
        return `${this.addLeadingZero(date.getHours(), 2)}:${this.addLeadingZero(date.getMinutes(), 2)}:${this.addLeadingZero(date.getSeconds(), 2)}`;
    }
};

export default new Utils();