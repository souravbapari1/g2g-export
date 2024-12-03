import { getAreaTypes } from "../../../request/fetch/getAreaType";
import xlsx from "xlsx";
import { mailSender } from "../../mail/mailSender";
export const genAreaTypeExcel = async (email: string) => {
    try {
        console.log("Loading Data...");
        let { items } = await getAreaTypes();
        items.forEach((e) => {

            // delete non required Fields
            // @ts-ignore
            delete e.collectionId;
            // @ts-ignore
            delete e.collectionName;

        });

        const worksheet = xlsx.utils.json_to_sheet(items);

        // 2. Create a new workbook and append the worksheet to it
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // 3. Write workbook to Excel file
        xlsx.writeFile(workbook, "public/area_type.xlsx");
        console.log("Complete Excel Generate");
        await mailSender("Area Type List Excel Report", email, ["area_type.xlsx"])

    } catch (error) {
        console.log(error);
    }
}