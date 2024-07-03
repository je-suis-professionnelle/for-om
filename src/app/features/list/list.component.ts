import {Component, Input, OnInit} from '@angular/core';
import { Item } from "../../models/Item";
import {NgClass, NgStyle} from "@angular/common";

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [NgClass, NgStyle]
})

export class ListComponent implements OnInit {

  @Input() Element!: Item;

  val! : number;
  item! : Item;
  backgroundColor!: string;
  fontSize!: number;

  ngOnInit(): void {
    this.val = 10;
    this.item = new Item(1, "Item 1", "Description 1111");
    this.backgroundColor = 'lightblue';
    this.fontSize = 20;
  }

  isPrimary = true;

  toggleButtonClass() {
    this.isPrimary = !this.isPrimary;
  }

  add() {
    this.val++;
  }
}
