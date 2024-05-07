import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

/* CATEGORY INTERFACES */

export interface CategoryObject {
  [key: string]: {
    url: string;
    faculty_count: number;
    department_count: number;
    article_count: number;
    faculty: string[];
    departments: string[];
    titles: string[];
    tc_count: number;
    citation_average: number;
    themes: string[];
  };
}

export interface CategoryData {
  url: string;
  faculty_count: number;
  department_count: number;
  article_count: number;
  faculty: string[];
  departments: string[];
  titles: string[];
  tc_count: number;
  citation_average: number;
  themes: string[];
}

export interface CategoryProps {
  category: string;
}

/* FACULTY STATS INTERFACES */
export interface ArticleCitationMap {
  [articleTitle: string]: number;
}

export interface CitationMap {
  article_citation_map: ArticleCitationMap;
}

export interface FacultyStats {
  total_citations: number;
  article_count: number;
  average_citations: number;
  citation_map: CitationMap;
}

export interface CategoryFacultyStats {
  [facultyName: string]: FacultyStats;
}

export interface FacultyCategoryData {
  [category: string]: {
    faculty_stats: CategoryFacultyStats;
  };
}

