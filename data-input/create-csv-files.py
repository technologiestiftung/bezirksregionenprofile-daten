from xlrd import open_workbook

import csv
import os

bzr_input_file_list = ['data-input/lichtenberg/rummelsburgerbucht']

for bzr in bzr_input_file_list:
    if not os.path.exists(bzr):
        os.makedirs(bzr)

    wb = open_workbook('{}.xlsx'.format(bzr))

    def is_whole_int(cellvalue):
        if isinstance(cellvalue, str):
            return False
        if (cellvalue % 1 == 0):
            return True
        else:
            False


    # skip BZR_intro tab
    for i in range(1, wb.nsheets):

        sheet = wb.sheet_by_index(i)

        with open('{}/{}.csv'.format(bzr, sheet.name.replace(" ","")), "w") as file:

            writer = csv.writer(file, delimiter = ",")

            for row_idx in range(0, sheet.nrows):
                row = [int(cell.value) if is_whole_int(cell.value)
                       else round(cell.value, 2) if isinstance(cell.value, float) 
                       else cell.value for cell in sheet.row(row_idx)]
                writer.writerow(row)