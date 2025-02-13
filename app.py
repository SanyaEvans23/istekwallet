from flask import Flask, jsonify, render_template
from tonsdk.contract.wallet import Wallets, WalletVersionEnum

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_wallet', methods=['GET'])
def generate_wallet():  
    mnemonics, pub_k, priv_k, wallet = Wallets.create(version=WalletVersionEnum.v4r2, workchain=0)
    return jsonify({
        "mnemonics": mnemonics,
        "address": wallet.address.to_string(True, True, True)
    })

if __name__ == '__main__':
    app.run(debug=True)