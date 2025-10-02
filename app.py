from flask import Flask, render_template, jsonify, request
import pandas as pd
import numpy as np
import pdfplumber
import json

app = Flask(__name__)
app.secret_key = "fhewhfiowe hsdvnio"
import os


def clean_table(table):
    cleaned_table = []
    for row in table:
        cleaned_row = []
        for cell in row:
            if cell:
                cleaned_row.append(cell.replace("\n", " "))
            else:
                cleaned_row.append(None)
        cleaned_table.append(cleaned_row)
    return cleaned_table


def read_pdf(path_to_pdf):
    pdf = pdfplumber.open(path_to_pdf)
    all_tables = []
    print(path_to_pdf)
    for page in pdf.pages:
        tb = page.extract_table({"text_line_dir": "btt"})
        print(tb[0])
        cleaned_table = clean_table(tb)
        print(cleaned_table)
        if page == pdf.pages[0]:
            df = pd.DataFrame(cleaned_table[:-1])
        else:
            df = pd.DataFrame(cleaned_table[8:-1])
        all_tables.append(df)
    return all_tables


def write_files(table, filename):
    combined_df = pd.concat(table, ignore_index=True)
    print(combined_df.head())
    combined_df.to_csv(f"{filename}.csv", index=False, header=False)


This_folder = os.walk("./")
print(This_folder)
Input_path = []
Output_path = []
for dirpath, dirname, filenames in This_folder:
    # print(dirpath, "\n", dirname, "\n", filenames)
    # print(filenames)
    if dirpath == "./Files":
        print(dirpath, filenames)
        for dir in dirname:
            Input_path.append(os.path.join(dirpath, dir))

    elif dirpath == "./Results":
        for dir in dirname:
            Output_path.append(os.path.join(dirpath, dir))

print(Input_path)
print(Output_path)
counter = 0
for path in Input_path:
    files = os.listdir(path)
    counter = counter + 1
    print(counter)
    if files:
        Output_path = []
        for file in files:
            if file.endswith(".pdf"):
                path_to_pdf = os.path.join(path, file)
                table = read_pdf(path_to_pdf)
                print((path_to_pdf.split("/")[3]).split("."))
                Output_filename = (
                    path_to_pdf.split("/")[0]
                    + "/Results/"
                    + path_to_pdf.split("/")[2]
                    + "/"
                    + (path_to_pdf.split("/")[3]).split(".")[0]
                )
                write_files(table, Output_filename)
                Output_path.append(f"{Output_filename}.csv")
        json_file = (
            path_to_pdf.split("/")[0]
            + "/Results/"
            + path_to_pdf.split("/")[2]
            + "/"
            + "index.json"
        )
        print(json_file)
        # for input in Input_path:
        with open(json_file, "w") as f:
            json.dump({"Files": Output_path}, f, indent=2)
#     print(os.listdir(input))
# filename = os.path.join(THIS_FOLDER, path_to_pdf)
# file = This_folder[5]
# path_to_pdf = "./Files/" + file
# pdf = pdfplumber.open(path_to_pdf)
# all_tables = []
# print(path_to_pdf)


# print(tables)
# rows = []
# print("TABLE")
# for table in tables:
#     print(table)
#     for row in table:
#         rows.append(row)
#         # print(row)
#     break;
#     print("\\n")


# @app.route("/")
# def home():
#     return render_template("index.html")


# @app.route("/data_recieve", methods=["GET", "POST"])
# def data_recieve():
#     data = combined_df.to_json(orient='index')
#     return data

# if __name__=="__main__":
#     app.run(debug=True)
