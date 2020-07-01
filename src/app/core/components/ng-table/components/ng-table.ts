import { NgTablePagingDirective } from './directives/ng-table-paging.directive';
import { NgTableSortingDirective } from './directives/ng-table-sorting.directive';
import { NgTableComponent } from './ng-table/ng-table.component';
import { NgTableFilteringDirective } from './directives/ng-table-filtering.directive';

export const NG_TABLE_DIRECTIVES = [
    NgTableFilteringDirective,
    NgTableComponent,
    NgTablePagingDirective,
    NgTableSortingDirective
];