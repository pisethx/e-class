import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const CustomPagination = (props) => {
    const paginator = props.paginator
    const onPageChanged = props.onPageChanged

    return (
        <Pagination aria-label="Page navigation example">     
            <PaginationItem disabled={paginator.currentPage === 1}>
            <PaginationLink first onClick={() => onPageChanged(page => page - 1)} />
            </PaginationItem>
            <PaginationItem disabled={paginator.currentPage === 1}>
                <PaginationLink previous onClick={() => onPageChanged(page => page - 1)} />
            </PaginationItem>

            <PaginationItem disabled={paginator.currentPage === paginator.lastPage}>
                <PaginationLink next onClick={() => onPageChanged(page => page + 1)} />
            </PaginationItem>
            <PaginationItem disabled={paginator.currentPage === paginator.lastPage}>
                <PaginationLink last onClick={() => onPageChanged(page => page + 1)} />
            </PaginationItem>
        </Pagination>
    );
};

export default CustomPagination;