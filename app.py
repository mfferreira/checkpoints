"""
ESC

cd ~/lib/checkpoints-code
python app.py

# Obs:
# Estou jinja2, vou ter que reescrever os templates pra checkpoints.hbs
# e pros outros pra que funcione corretamente.

"""

from flask import Flask, render_template, request
app = Flask(__name__)

@app.route("/checkpoints")
def checkpoints(username=None):
    """ Preciso agora, so' construir a url de request,
        preciso entender melhor que tipo de dados
        o checkpoint vai guardar etc."""

    env      = app.create_jinja_environment()
    template = env.get_template('checkpoints')
    return render_template('main', body=template.render())


@app.route("/checkpoints/add", methods=['POST'])
def checkpoints_add():
    print request.form['checkpointName']
    print request.form['checkpointType']
    print request.form['checkpointStatus']
    print request.form['checkpointFunction']
    print request.form['beaconMajor']
    print request.form['beaconMinor']
    print request.form['location']

    # daqui(acredito eu que devo fazer requests com o kinvey
    # pra entao adicionar os dados la.
    # preciso ver q tipo de requests tenho de fazer
    # se vc tem exemplos em js de requests, me manda ai
    # que ai e' so' traduzir pro python.
    return '<p> test </p>'

@app.route("/")
def root(username=None):
    return '<p> root </p>'

if __name__ == "__main__":
    app.run(host='0.0.0.0')










