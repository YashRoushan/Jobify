import React from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

const PageBtnContainer = () => {

    const { data: { numOfPages, currentPage } } = useAllJobsContext();
    console.log(numOfPages);
    return <h1>
        pagebencontainer
    </h1>

}

export default PageBtnContainer;
