from flask import Flask, request, jsonify
import openai
from flask_cors import CORS, cross_origin
import os

app = Flask(__name__)
CORS(app)

# Replace this with your own API key
openai.api_key = os.eniron["OPENAI_API_KEY"]

@app.route('/subtopics', methods=['POST'])
@cross_origin()
def generate_subtopics():
    topic = request.json['topic']

    # Generate subtopics using the OpenAI API
    subtopics = get_subtopics(topic)

    return jsonify(subtopics)


def get_subtopics(topic):
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=f"List subtopics related to {topic} divided by new lines:",
            max_tokens=100,
            n=1,
            stop=None,
            temperature=0.5,
        )

        subtopics_raw = response.choices[0].text.strip().split('\n')
        subtopics = [subtopic.strip().replace("-", "") for subtopic in subtopics_raw if subtopic.strip()]
        print(subtopics)

        return subtopics

    except Exception as e:
        print(e)
        return []
    
@app.route('/study-guide', methods=['POST'])
@cross_origin()
def generate_study_guide():
    subtopic = request.json['subtopic']
    topic = request.json['topic']

    # Generate a study guide using the OpenAI API
    study_guide = get_study_guide(topic, subtopic)

    return jsonify({"study_guide": study_guide})


def get_study_guide(topic, subtopic):
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=f"Provide a in-depth study guide for the subtopic '{subtopic}' inside the main topic '{topic}'.\n\nfollow a specific structure where headings start with '\#\#', subheadings start with '\#\#\#', and paragraphs are separated by two newline characters ('\n\n').\nMake sure to separate the headings and subheadings with two new lines.\nStart with the subtopic first as a heading.",
            max_tokens=1000,
            n=1,
            stop=None,
            temperature=0.6,
        )

        study_guide = response.choices[0].text

        return study_guide

    except Exception as e:
        print(e)
        return "Error generating study guide"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
