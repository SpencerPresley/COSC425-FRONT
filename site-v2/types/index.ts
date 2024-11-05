import { SVGProps } from 'react';

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
    definition: string;
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

export interface CrossrefArticleDetails {
  /**
   * An interface representing details about an individual article.
   *
   * Attributes:
   *     tc_count (number): Total citation count for the article.
   *     faculty_members (string[]): List of faculty members associated with the article.
   *     faculty_affiliations (Record<string, string[]>): Mapping of faculty members to their affiliations.
   */
  _id: string;
  title: string;
  tc_count: number;
  faculty_members: string[];
  faculty_affiliations: Record<string, string[]>;
  abstract: string;
  license_url: string;
  date_published_print: string;
  date_published_online: string;
  journal: string;
  download_url: string;
  doi: string;
}
