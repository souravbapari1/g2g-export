
import { getLineAndCharacterOfPosition } from "typescript";
import { excelQueue } from "../queue";
import { getAccredationStandars } from "../request/fetch/getAccStanders";
import { genAreaTypeExcel } from "./services/excel/genAreaTypeExcel";
import { genBlogCategoryExcel } from "./services/excel/genBlogCategoryExcel";
import { genMeasurementsExcel } from "./services/excel/genMeasurementsExcel";
import { genProjectTypeExcel } from "./services/excel/genProjectTypeExcel";
import { genSdgListExcel } from "./services/excel/genSdgListExcel";
import { genUnitTypeExcel } from "./services/excel/genUnitTypeExcel";
import { genAccStanderdsExcel } from "./services/excel/genAccStanderdsExcel";
import { genProjectExcel } from "./services/excel/genProjectsExcel";
import { genTreesExcel } from "./services/excel/genTreesExcel";
import { genTreeTypesExcel } from "./services/excel/genTreeTypeExcel";

export const startExcelWorker = () => {
    excelQueue.process(async (job) => {
        const { base, email } = job.data.data;
        switch (base) {
            case "project_type":
                await genProjectTypeExcel(email);
                break;
            case "sdg_list":
                await genSdgListExcel(email)
                break;
            case "unit_types":
                await genUnitTypeExcel(email)
                break;
            case "measurements":
                await genMeasurementsExcel(email)
                break;
            case "area_type":
                await genAreaTypeExcel(email);
                break;
            case "blog_category":
                await genBlogCategoryExcel(email);
                break;
            case "accredation_standars":
                await genAccStanderdsExcel(email);
                break;
            case "projects":
                await genProjectExcel(email);
                break;
            case "trees":
                await genTreesExcel(email);
                break;
            case "tree_types":
                await genTreeTypesExcel(email);
                break;
            default:
                console.log("Unknown data - " + base);
                break;
        }

    })
}