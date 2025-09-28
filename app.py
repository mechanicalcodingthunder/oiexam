from flask import Flask, render_template, jsonify, request
import pandas as pd
import numpy as np
from PIL import Image
import pdfplumber
from pytesseract import image_to_string
from pdf2image import convert_from_path
app = Flask(__name__)
app.secret_key = 'fhewhfiowe hsdvnio'
import os
print("hel")
This_folder = os.listdir("./Files/")
print(This_folder)
# filename = os.path.join(THIS_FOLDER, path_to_pdf)
file= This_folder[3]
path_to_pdf = "./Files/"+file;
pdf = pdfplumber.open(path_to_pdf)
first_page = pdf.pages[0]
tables = first_page.extract_tables()
rows = [];
for table in tables:
    for row in table:
        rows.append(row)
        print(row)
        print(len(row))

@app.route('/')
def home():
  table = rows # indent for pretty-printing
  print(table)
  return render_template('index.html')

@app.route("/data_recieve",methods=['GET','POST'])
def data_recieve():
    data = rows;
    return jsonify(data)

if __name__=="__main__":
    app.run(debug=True)